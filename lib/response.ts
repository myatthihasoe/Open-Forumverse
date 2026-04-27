import { NextResponse } from "next/server";
import { ZodError } from "zod";

const handleSuccessResponse = (data: unknown, status: number = 200) => {
  return NextResponse.json(
    {
      data,
      success: true,
      status,
    },
    { status }
  );
};

const handleErrorResponse = (error: unknown) => {
  let status = 500;
  let message = error instanceof Error ? error.message : "Internal Server Error";
  let details = null;
  if (error instanceof ZodError) {
    details = error.flatten().fieldErrors;
    message = "Bad Request";
    status = 400;
  }
  return NextResponse.json(
    {
      message,
      success: false,
      details,
      status,
    },
    { status }
  );
};

export { handleSuccessResponse, handleErrorResponse };
