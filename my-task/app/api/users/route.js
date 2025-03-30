import { connectToDB } from "@/lib/mongodb";
import User from "@/models/user";

// Create User (POST)
export async function POST(req) {
  try {
    await connectToDB();
    const { name, email, password } = await req.json();
    const newUser = new User({ name, email, password });
    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error creating user" }), { status: 500 });
  }
}

// Get All Users (GET)
export async function GET() {
  try {
    await connectToDB();
    const users = await User.find({ isDeleted: false }); // Only get non-deleted users
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching users" }), { status: 500 });
  }
}

// Update User (PUT)
export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const { name, email, password } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    if (!updatedUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error updating user" }), { status: 500 });
  }
}

// Soft Delete User (PATCH)
export async function PATCH(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const updatedUser = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!updatedUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error soft deleting user" }), { status: 500 });
  }
}
