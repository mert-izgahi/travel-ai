import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";

export async function GET(req: NextRequest) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json({ result: currentUser }, { status: 200 });
}
