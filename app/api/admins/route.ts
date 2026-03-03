import { NextResponse } from "next/server";
import { getAdminsService } from "@/services/userService"; // Adjust this path to your actual service file

export async function GET() {
  try {
    // Call the service you just created
    const admins = await getAdminsService();

    // Return the data as JSON
    return NextResponse.json(admins);
  } catch (error) {
    console.error("Admin API Error:", error);
    
    // Return a 500 error if the database query fails
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}