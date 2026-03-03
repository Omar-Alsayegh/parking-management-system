import { fetchAllUsers } from "@/services/userService";
import { fetchAllParkings } from "@/services/parkingService";
import { redirect } from "next/dist/client/components/navigation";

export default async function Home() {
  const users = await fetchAllUsers();
  const parkings = await fetchAllParkings();

  redirect("/dashboard");
}