import { AnswerType } from "@/database/answer.model";
import React from "react";

function AnswerList({
  answers,
  success,
  errorMessage,
  totalAnswers,
}: {
  answers: AnswerType[];
  success: boolean;
  errorMessage?: string;
  totalAnswers: number;
}) {
  return <div>AnswerList - {totalAnswers}</div>;
}

export default AnswerList;