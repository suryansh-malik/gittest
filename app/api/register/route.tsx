import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function POST(request:Request) {
    // validating inputs fields
    let body;
    try {
        body = await request.json();
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Invalid JSON payload." },
            { status: 400 }
        );
    }

    const { email, password } = body || {};

    //  Validating Input Fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }
    // check if Email is Already Registered

    try {
      const existingUser = await prisma.user.findUnique({
          where: { email },
      });

      if (existingUser) {
          return NextResponse.json(
              { success: false, message: "Email is already in use." },
              { status: 409 }
          );
      }
  } catch (error) {
      console.error("Error checking existing user:", error);
      return NextResponse.json(
          { success: false, message: "Database error while checking user." },
          { status: 500 }
      );
  }
  // saving user to Database
  let newUser;
    try {
        newUser = await prisma.user.create({
            data: {
                email,
                password
            },
        });

    } catch (prismaError) {
        console.error("Error creating user in Prisma:", prismaError);
        return NextResponse.json(
            { success: false, message: "Database error while creating user." },
            { status: 500 }
        );
    }  

    // Return Success Response
    return NextResponse.json(
      { message: "User registered successfully", user: { id: newUser.id, email: newUser.email } },
      { status: 201 }
    );
  }