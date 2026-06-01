import DataRenderer from "@/components/DataRenderer";
import Pagination from "@/components/Pagination";
import ThreadCard from "@/components/ThreadCard";
import getTagQuestions from "@/lib/actions/GetTagQuestions";

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { id } = await params;
  const { page, pageSize, search } = await searchParams;

  const { success, data, message } = await getTagQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    tagId: id,
    sort: "newest",
    search: search || "",
  });

  const { questions = [], tag, isNext = false } = data || {};

  return (
    <>
      <div className="flex justify-between items-center p-5">
        <div>
          <h1 className="font-extrabold text-3xl text-white">
            {tag?.name || ""}
          </h1>
        </div>
      </div>

      <DataRenderer
        success={success}
        data={questions}
        errorMessage={message}
        render={(questions) =>
          questions?.map((question, i) => (
            <ThreadCard key={i} question={question} />
          ))
        }
      />
      <Pagination isNext={isNext} page={page || 1} />
    </>
  );
}
