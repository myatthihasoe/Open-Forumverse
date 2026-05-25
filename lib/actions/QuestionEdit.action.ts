"use server";

import Question, { QuestionWithTagsType } from "@/database/question.model";
import mongoose from "mongoose";
import dbConnect from "../dbConnect";
import validateData from "../validateData";
import { auth } from "@/auth";
import { actionError } from "../response";
import TagQuestion from "@/database/tag-question.model";
import Tag from "@/database/tag.model";
import QuestionEditSchema from "../schemas/QuestionEditSchema";

export async function QuestionEdit(params: {
  questionId: string;
  title: string;
  content: string;
  tags: string[];
}): Promise<{
  success: boolean;
  data?: QuestionWithTagsType;
}> {
  await dbConnect();
  const validatedData = validateData(params, QuestionEditSchema);
  const { questionId, title, content, tags } = validatedData.data;
  const auth_session = await auth();
  const userId = auth_session?.user?.id;

  if (!userId) {
    throw new Error("Authentication required");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const question = await Question.findById(questionId).populate("tags");
    if (!question) {
      throw new Error("Failed to update a question");
    }

    // Verify ownership
    if (String(question.author) !== userId) {
      throw new Error("Unauthorized: You can only edit your own questions");
    }

    question.title = title;
    question.content = content;
    await question.save({ session });

    // Remove old tag associations
    await TagQuestion.deleteMany({ question: question._id }, { session });

    // Decrement question count for old tags
    // const oldTagNames = (question.tags as mongoose.Types.ObjectId[]).map((tag) => String(tag.toString()));
    // for (const oldTagName of oldTagNames) {
    //   if (!tags.includes(oldTagName)) {
    //     await Tag.updateOne(
    //       { _id: oldTagName },
    //       { $inc: { questions: -1 } },
    //       { session }
    //     );
    //   }
    // }

    //Get old tag Ids for comparison
    const oldTagIds = new Set(
      ((question.tags as mongoose.Types.ObjectId[]) || []).map((t) => String(t))
    );

    // Process new tags
    const tagIds: mongoose.Types.ObjectId[] = [];
    const tagQuestionDocuments = [];

    //Helper to escape regex special characters
    const escapeRegex = (str: string) =>
      str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${escapeRegex(tag)}$`, "i") } },
        { $setOnInsert: { name: tag, questions: 0 } },
        { upsert: true, new: true, session }
      );

      // Only increment if this tag wasn't on the question before
      if (!oldTagIds.has(String(existingTag._id))) {
        await Tag.updateOne(
          { _id: existingTag._id },
          { $inc: { questions: 1 } },
          { session }
        );
      }

      tagIds.push(existingTag._id as mongoose.Types.ObjectId);
      tagQuestionDocuments.push({
        tag: existingTag._id,
        question: question._id,
      });
    }

    // Update question with new tags
    await Question.findByIdAndUpdate(
      question._id,
      { $set: { tags: tagIds } },
      { session }
    );

    // Create new tag-question associations
    await TagQuestion.insertMany(tagQuestionDocuments, { session });

    await session.commitTransaction();

    // Refetch the updated question with populated tags
    const updatedQuestion = await Question.findById(question._id)
      .populate("tags")
      .session(session);

    return { success: true, data: JSON.parse(JSON.stringify(updatedQuestion)) };
  } catch (error) {
    await session.abortTransaction();
    return actionError(error);
  } finally {
    await session.endSession();
  }
}
