import { fetchAllUsers, fetchUserById, registerUser } from "@/services/userService";
import { NextResponse } from "next/server";

export async function GET() {
    try {
    const users = await fetchAllUsers();
    return new Response(JSON.stringify(users), { status: 200 });
} catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
}
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        if (!body.name || !body.email || !body.password) {
            return NextResponse.json({ error: "Missing required fields: name, email, or password" }, { status: 400 });
        }

        const userId = await registerUser(
            body.name, 
            body.email, 
            body.password, 
            body.role || "user" // Default to "user" if role is missing
        );

        return NextResponse.json({ id: userId }, { status: 201 });
    } catch (error: any) {
        console.error("User Creation Error:", error.message);
        return NextResponse.json({ error: error.message || "Failed to create user" }, { status: 500 });
    }
}