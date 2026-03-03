import { NextResponse } from "next/server";
import { getAdminsService } from "@/services/userService"; // Adjust this path to your actual service file

export async function GET() {
  try {
    const admins = await getAdminsService();

    return NextResponse.json(admins);
  } catch (error) {
    console.error("Admin API Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}