import { AnswerResponseType } from "@/database/answer.model";
import AnswerCard from "./AnswerCard";
import DataRenderer from "./DataRenderer";
import CommonFilter from "./CommonFilter";
import { AnswerFilters, DefaultFilters } from "@/constant/filters";

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
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xl">Answer List - {totalAnswers}</h3>
        <CommonFilter filters={AnswerFilters} defaultFilter={DefaultFilters.AnswerFilters} />
      </div>
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
