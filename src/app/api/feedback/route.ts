import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const PostFeedbackRequestBody = z.object({
  message: z.string().max(1000),
});

export const POST = async (request: NextRequest) => {
  const body = PostFeedbackRequestBody.parse(await request.json());

  const feedback = await prisma.feedback.create({
    data: {
      message: body.message,
    },
  });

  return NextResponse.json(feedback, { status: 201 });
};
