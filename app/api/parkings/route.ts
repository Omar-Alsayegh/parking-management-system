import { fetchAllParkings, registerParking } from "@/services/parkingService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const parkings = await fetchAllParkings();
    return new Response(JSON.stringify(parkings), { status: 200 });
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Extract only the fields you want
    const { name, total_slots, status } = body;

    // 2. Simple validation to ensure we have the basics
    if (!name || total_slots === undefined) {
      return NextResponse.json(
        { error: "Name and total_slots are required" },
        { status: 400 }
      );
    }

    // 3. Call service with name, total_slots, and status. 
    // Pass empty strings for location, description, and price_per_hour as requested.
    const newParking = await registerParking(
      name,
      Number(total_slots),
      status || "active" // default to active if not provided
    );

    return NextResponse.json(
      { message: "Parking created successfully", data: newParking },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create Error:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to create parking" },
      { status: 500 }
    );
  }
}