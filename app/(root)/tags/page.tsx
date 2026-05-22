import { auth } from "@/auth";
import DataRenderer from "@/components/DataRenderer";
import TagInfoCard from "@/components/TagInfoCard";
import { getTags } from "@/lib/actions/GetTags.action";

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string;
  }>;
}) {
  const session = await auth();
  const { page, pageSize, search, filter } = await searchParams;

  const { success, data, message } = await getTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    search: search || "",
    filter: filter || "",
  });

  const { tags = [] } = data || {};

  return (
    <>
      <div className="flex items-center justify-between p-5">
        <div>
          <h1 className="text-3xl font-bold">All Tags</h1>
        </div>
      </div>
      <DataRenderer
        success={success}
        data={tags}
        errorMessage={message}
        render={(tags) => {
          return (
            <div className="grid grid-cols-4 gap-4">
              {tags.map((tag, i) => (
                <TagInfoCard
                  key={i}
                  id={tag._id.toString()}
                  name={tag.name}
                  count={tag.questions}
                />
              ))}
            </div>
          );
        }}
      />
    </>
  );
}

export default page;
