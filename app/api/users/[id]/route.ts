import { NextRequest, NextResponse } from "next/server";
import { 
  fetchUserById, 
  updateUserService, 
  deleteUserService 
} from "@/services/userService";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const user = await fetchUserById(parseInt(id));
        
        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const userId = Number(id);

    await updateUserService(
        userId, 
        body.name, 
        body.email, 
        body.role, 
        body.updated_by || null
    );

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update user" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const userId = Number(id);

    await deleteUserService(userId);

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to delete user" },
      { status: 400 }
    );
  }
}