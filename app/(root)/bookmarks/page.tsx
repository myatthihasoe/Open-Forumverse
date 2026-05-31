import DataRenderer from "@/components/DataRenderer";
import Filters from "@/components/Filters";
import ThreadCard from "@/components/ThreadCard";
import getBookMarkCollections from "@/lib/actions/GetBookMarkCollections";

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string;
  }>;
}) {
  const { page, pageSize, search, filter } = await searchParams;

  const { success, data, message } = await getBookMarkCollections({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    search: search || "",
    filter: filter || "",
  });

  const { collections = [] } = data || {};

  return (
    <>
      <div className="flex items-center justify-between p-5">
        <div>
          <h1 className="text-3xl font-bold">Saved Threads</h1>
        </div>
      </div>
      <Filters />
      <DataRenderer
        success={success}
        data={collections}
        errorMessage={message}
        render={(collections) =>
          collections.map((collection, i) => (
            <ThreadCard key={i} question={collection.question} />
          ))
        }
      />
    </>
  );
}

export default page;