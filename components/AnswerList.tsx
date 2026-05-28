import { AnswerResponseType } from "@/database/answer.model";
import AnswerCard from "./AnswerCard";
import DataRenderer from "./DataRenderer";

function AnswerList({
  answers,
  success,
  errorMessage,
  totalAnswers,
}: {
  answers: AnswerResponseType[];
  success: boolean;
  errorMessage?: string;
  totalAnswers: number;
}) {
  return (
    <div className="mt-8">
      <h3 className="font-bold text-xl">Answer List - {totalAnswers}</h3>
      <DataRenderer
        success={success}
        errorMessage={errorMessage}
        data={answers}
        render={(answers) => {
          return answers.map((answer, i) => {
            return <AnswerCard key={i} answer={answer} />;
          });
        }}
      />
    </div>
  );
}

export default AnswerList;
