import prisma from "@/prisma/db";
import { currentUser } from "@clerk/nextjs";

export async function getCurrentUser() {
    const clerkUser = await currentUser();
    if (!clerkUser) {
        return null;
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            clerkId: clerkUser.id,
        },
    });

    if (!existingUser) {
        return null;
    }

    return existingUser;
}
