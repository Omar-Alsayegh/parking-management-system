import { NextRequest, NextResponse } from "next/server";
import {
  fetchParkingById,
  updateParkingService,
  deleteParkingService,
} from "@/services/parkingService";

// --- GET: Fetch Single Parking ---
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 1. Change to Promise
) {
  try {
    // 2. Await the params!
    const { id } = await params;
    const parkingId = Number(id);

    if (isNaN(parkingId)) {
      return NextResponse.json({ error: "Invalid Parking ID" }, { status: 400 });
    }

    const parking = await fetchParkingById(parkingId);
    
    if (!parking) {
      return NextResponse.json({ error: "Parking not found" }, { status: 404 });
    }

    return NextResponse.json(parking);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 } // Changed to 500 for general server errors
    );
  }
}

// --- PUT: Update Parking ---
export async function PUT(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await params;
    const parkingId = Number(id);

    if (isNaN(parkingId)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await req.json();

    // Service signature check: ensure these keys exist in your incoming 'body'
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

// --- DELETE: Remove Parking ---
export async function DELETE(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const parkingId = Number(id);

    if (isNaN(parkingId)) {
        return NextResponse.json({ error: "Invalid Parking ID" }, { status: 400 });
    }

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