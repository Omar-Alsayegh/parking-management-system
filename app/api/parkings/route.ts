import { fetchAllParkings, registerParking } from "@/services/parkingService";

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

export async function POST(request: Request) {
  try {
    const {
      name,
      location,
      description,
      price_per_hour,
      total_slots,
      status,
    } = await request.json();

    const parkingId = await registerParking(
      name,
      location,
      description,
      price_per_hour,
      total_slots,
      status
    );

    return new Response(JSON.stringify({ id: parkingId }), { status: 201 });
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}