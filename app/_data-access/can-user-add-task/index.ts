import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentDayTasks } from "../get-current-day-tasks";

export const canUserAddtask = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await clerkClient().users.getUser(userId);
  if (user.publicMetadata.subscriptionPlan === "premium") return true;

  const currentDayTasks = await getCurrentDayTasks();
  if (currentDayTasks >= 5) return false;

  return true;
};
