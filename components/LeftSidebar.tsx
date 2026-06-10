import { FaHome } from "react-icons/fa";
import ROUTES from "@/routes";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import SidebarNav from "./SidebarNav";
import { RiLogoutCircleLine } from "react-icons/ri";

export default async function LeftSidebar() {
  const session = await auth();
  const user = session?.user;
  const isAuthenticated = !!user;

  return (
    <div className="w-1/5 px-5 py-2">
      <SidebarNav isAuthenticated={isAuthenticated} />
      {user && (
        <div className="mt-6">
          <form
            action={async () => {
              "use server";
              await signOut({ redirect: false });
              return redirect(ROUTES.LOGIN);
            }}
          >
            <button
              type="submit"
              className="w-full rounded-xl bg-red-500 p-3 flex items-center space-x-4 text-[16px] font-bold"
            >
              <RiLogoutCircleLine />
              <span>Logout</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
