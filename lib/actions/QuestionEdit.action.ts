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

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const question = await Question.findById(questionId).populate("tags");
    if (!question) {
      throw new Error("Failed to update a question");
    }

    question.title = title;
    question.content = content;
    await question.save({ session });

    // Remove old tag associations
    await TagQuestion.deleteMany({ question: question._id }, { session });

    // Decrement question count for old tags
    // const oldTagNames = (question.tags as any[]).map((tag) => tag.name);
    // for (const oldTagName of oldTagNames) {
    //   if (!tags.includes(oldTagName)) {
    //     await Tag.updateOne(
    //       { name: oldTagName },
    //       { $inc: { questions: -1 } },
    //       { session }
    //     );
    //   }
    // }

    // Process new tags
    const tagIds: mongoose.Types.ObjectId[] = [];
    const tagQuestionDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $inc: { questions: 1 } },
        { upsert: true, new: true, session }
      );

      tagIds.push(existingTag._id);
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
