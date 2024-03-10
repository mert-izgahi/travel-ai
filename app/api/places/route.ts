import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import { placeInputSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { Place } from "@prisma/client";
export async function POST(req: NextRequest) {
    const body = await req.json();

    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = currentUser?.role;
    if (role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isValid = placeInputSchema.safeParse(body);
    if (!isValid.success) {
        return NextResponse.json({ error: isValid.error });
    }

    const {
        name,
        description,
        location,
        latitude,
        longitude,
        city,
        country,
        images,
    } = body;

    const place = await prisma.place.create({
        data: {
            name,
            description,
            location,
            latitude,
            longitude,
            city,
            country,
            images,
        } as Place,
    });

    return NextResponse.json({ result: place }, { status: 200 });
}

export async function GET(req: NextRequest) {
    const places = await prisma.place.findMany();
    return NextResponse.json({ result: places }, { status: 200 });
}
