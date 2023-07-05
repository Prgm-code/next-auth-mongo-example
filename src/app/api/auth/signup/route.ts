

import { NextResponse } from "next/server";
import User from "@/models/user";
import {connectDB} from "@/libs/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { fullname, email, password } = await request.json();
  console.log(fullname, email, password);

  if (!password || password.length < 6) {
    return NextResponse.json(
      {
        message: "Password must be at least 6 characters",
      },
      { status: 400 }
    );
  }
  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound)
      return NextResponse.json(
        { message: "The email is already taken" },
        { status: 400 }
      );
    const hashedPassword = await bcrypt.hash(password, 10);
    const savedUser = await new User({
      fullname,
      email,
      password: hashedPassword,
    }).save();
    console.log(savedUser);
    return NextResponse.json({
        message: "User created successfully",
        _id: savedUser._id,
        fullname : savedUser.fullname,
        email : savedUser.email

    });
  } catch (error) {
    console.log(error);
    
    if (error instanceof Error) {

        return NextResponse.json({ message: error.message }, { status: 400 });
        }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
        
    }
}

