"use server";

import { actionError } from "../response";
import GenerateAiAnswerSchema from "../schemas/GenerateAiAnswerSchema";
import validateData from "../validateData";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

const getAiGenerationErrorMessage = (error: unknown) => {
  const message =
    error instanceof Error ? error.message : "Internal Server Error";
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("quota") ||
    normalizedMessage.includes("rate-limit") ||
    normalizedMessage.includes("rate limit")
  ) {
    return "AI answer generation is temporarily unavailable because the Gemini API quota has been exceeded. Please try again later or update your Google AI billing/quota.";
  }

  return message;
};

const generateAiAnswerAction = async (params: {
  title: string;
  content: string;
  userAnswer: string;
}): Promise<{
  success: boolean;
  data?: {
    answer: string;
  };
  message?: string;
  details?: object | null;
}> => {
  try {
    const validatedData = validateData(params, GenerateAiAnswerSchema);
    const { title, content, userAnswer } = validatedData.data;
    const { text: answer } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt: `Generate a clear and concise answer in markdown format to the question: "${title}".

Use the context and the user's answer **only to improve accuracy** - do not mention them or explain how they are used.

**Context:** ${content}
**User's Answer:** ${userAnswer}

Rules:
- If the user's answer is correct, refine and expand on it.
- If the user's answer is incomplete or incorrect, correct it and provide the proper explanation.
- Do NOT reference the context, the prompt, or say things like "based on the context" or "the user's input".
- Final output must be the answer only, written in helpful markdown format.`,
      system:
        "You are a helpful assistant that provides informative responses in markdown format. Use appropriate markdown syntax for headings, lists, code blocks, and emphasis where necessary. For code blocks, use short-form smaller case language identifiers (e.g., 'js' for JavaScript, 'py' for Python, 'ts' for TypeScript, 'html' for HTML, 'css' for CSS, etc.).",
    });

    return {
      success: true,
      data: {
        answer,
      },
    };
  } catch (e) {
    const error = actionError(e);

    return {
      ...error,
      message: getAiGenerationErrorMessage(e),
    };
  }
};

export default generateAiAnswerAction;
