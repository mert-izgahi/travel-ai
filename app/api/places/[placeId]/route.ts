import { placeInputSchema } from "@/lib/validations";
import prisma from "@/prisma/db";
import { NextResponse, NextRequest } from "next/server";
interface Props {
    placeId: string;
}

export async function GET(req: NextRequest, { params }: { params: Props }) {
    const { placeId } = params;

    const place = await prisma.place.findUnique({
        where: {
            id: placeId,
        },
    });

    return NextResponse.json({ result: place });
}

export async function PUT(req: NextRequest, { params }: { params: Props }) {
    const { placeId } = params;
    const body = await req.json();
    const isValid = placeInputSchema.safeParse(body);
    if (!isValid.success) {
        return NextResponse.json({ error: isValid.error });
    }
    const result = await prisma.place.update({
        where: {
            id: placeId,
        },
        data: {
            ...body,
        },
    });
    return NextResponse.json({ result });
}

export async function DELETE(req: NextRequest, { params }: { params: Props }) {
    const { placeId } = params;
    const result = await prisma.place.delete({
        where: {
            id: placeId,
        },
    });
    return NextResponse.json({ result });
}
