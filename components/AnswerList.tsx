import AnswerCard from "./AnswerCard";
import DataRenderer from "./DataRenderer";
import CommonFilter from "./CommonFilter";
import { AnswerFilters, DefaultFilters } from "@/constant/filters";
import GetAnswers from "@/lib/actions/GetAnswers";
import Pagination from "./Pagination";

async function AnswerList({
  page,
  pageSize,
  filter,
  id,
}: {
  page: number;
  pageSize: number;
  filter: string;
  id: string;
}) {
  const {
    data: answersData,
    success,
    message: errorAnswer,
  } = await GetAnswers({
    questionId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    filter: filter || "",
  });

  const { answers = [], totalAnswers = 0, isNext = false } = answersData || {};
  return (
    <>
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">Answer List - {totalAnswers}</h3>
          <CommonFilter
            filters={AnswerFilters}
            defaultFilter={DefaultFilters.AnswerFilters}
          />
        </div>
        <DataRenderer
          success={success}
          errorMessage={errorAnswer}
          data={answers}
          render={(answers) => {
            return answers.map((answer, i) => {
              return <AnswerCard key={i} answer={answer} />;
            });
          }}
        />
      </div>
      <Pagination isNext={isNext} page={page || 1} />
    </>
  );
}

export default AnswerList;
