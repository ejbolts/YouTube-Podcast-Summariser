// pages/api/signup.js
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "@/lib/dynamodb";
import { NextRequest, NextResponse } from "next/server";
import { ErrorResponse } from "../transcript/route";
import { v4 as uuidv4 } from "uuid";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    const params = {
      TableName: process.env.DB_NAME,
      Item: {
        userID: uuidv4(),
        username: username,
        email: email,
        password: password,
      },
    };

    await ddbDocClient.send(new PutCommand(params));
    return NextResponse.json({ message: "User added successfully" });
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json<ErrorResponse>(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
