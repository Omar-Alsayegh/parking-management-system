import { NextRequest, NextResponse } from "next/server";
import {
  fetchParkingById,
  updateParkingService,
  deleteParkingService,
} from "@/services/parkingService";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const parking = await fetchParkingById(Number(params.id));
    return NextResponse.json(parking);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 404 }
    );
  }
}

export async function PUT(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    // 1. Await the params to get the ID
    const { id } = await params;
    const parkingId = Number(id);

    // 2. Parse the body
    const body = await req.json();

    // 3. Call service with EXPLICIT arguments
    // Service signature: (id, name, location, description, price_per_hour, total_slots, status)
    await updateParkingService(
      parkingId,
      body.name,
      body.location,
      body.description,
      body.price_per_hour,
      body.total_slots,
      body.status
    );

    return NextResponse.json({ message: "Parking updated successfully" });
  } catch (error: any) {
    console.error("Update Error:", error.message);
    return NextResponse.json(
      { message: error.message || "Failed to update parking" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Await the params to get the ID safely
    const { id } = await params;
    const parkingId = Number(id);

    // 2. Simple validation
    if (isNaN(parkingId)) {
        return NextResponse.json({ error: "Invalid Parking ID" }, { status: 400 });
    }

    // 3. Call the service
    await deleteParkingService(parkingId);

    return NextResponse.json({ message: "Parking deleted successfully" });
  } catch (error: any) {
    console.error("Delete Error:", error.message);
    return NextResponse.json(
      { message: error.message || "Failed to delete parking" }, 
      { status: 404 }
    );
  }
}