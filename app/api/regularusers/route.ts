import { NextResponse } from "next/server";
import { getRegularUsersService } from "@/services/userService"; // Adjust this path to your actual service file

export async function GET() {
  try {
    const admins = await getRegularUsersService();

    return NextResponse.json(admins);
  } catch (error) {
    console.error("Regular Users API Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}