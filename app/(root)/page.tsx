import { auth } from "@/auth";

export default async function page() {
  const session = await auth();
  console.log("Github User Data", session);
  return <>{session?.user?.email}</>;
}
