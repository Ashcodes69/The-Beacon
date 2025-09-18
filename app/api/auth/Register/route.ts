import { connectDb } from "@/lib/db";
import User from "@/models/User";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req: NextRequest){
  try{
    const {name,email, password} = await req.json()

    if(!name || !email || !password){
      return NextResponse.json(
        { success: false, error: "Name ,Email, Password id required" },
        { status: 400 }
      )
    }

    await connectDb()

    const existingUser = await User.findOne({email})
    if(existingUser){
      return NextResponse.json(
      { success: false, error: "User is already registered" },
      { status: 400 }
      )
    }

    await User.create(
      {
        name,
        email,
        password
      }
    )
    return NextResponse.json(
      { success: true, message: "User registered successfully" },
      { status: 200 }
    );

  }catch(err){
    console.error("Registration Error: ", err);
    return NextResponse.json(
      { success: false, error: "filed to register User" },
      { status: 400 }
    );
  }
}