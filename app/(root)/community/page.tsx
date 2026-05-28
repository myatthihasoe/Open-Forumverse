import { auth } from "@/auth";
import DataRenderer from "@/components/DataRenderer";
import GetUsers from "@/lib/actions/GetUsers";
import UserCard from "./components/UserCard";

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string;
  }>;
}) {
  await auth();
  const { page, pageSize, search, filter } = await searchParams;

  const { success, data, message } = await GetUsers({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    search: search || "",
    filter: filter || "",
  });

  const { users = [] } = data || {};

  return (
    <>
      <div className="flex items-center justify-between p-5">
        <div>
          <h1 className="text-3xl font-bold">All Users</h1>
        </div>
      </div>
      <DataRenderer
        success={success}
        data={users}
        errorMessage={message}
        render={(users) => {
          return (
            <div className="grid grid-cols-4 gap-4">
              {users.map((user) => {
                const userId = user._id?.toString() ?? user.username;

                if (!userId) return null;

                return (
                  <UserCard
                    key={userId}
                    id={userId}
                    name={user?.name}
                    image={user?.image}
                  />
                );
              })}
            </div>
          );
        }}
      />
    </>
  );
}

export default page;
