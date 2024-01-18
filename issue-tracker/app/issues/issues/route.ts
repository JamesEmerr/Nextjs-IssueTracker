import { NextRequest, NextResponse } from "next/server";
//import { describe } from "node:test";
import { z } from 'zod';
import { Prisma } from "@prisma/client";

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    createIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400})

    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description}
    })

    return NextResponse.json(newIssue, { status: 201})
    }