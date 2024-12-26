import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const { userId } = await auth();
  if (!userId) return redirect("/login");

  return <UserButton showName />;
};

export default Dashboard;
