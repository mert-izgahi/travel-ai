import { currentUser } from "@clerk/nextjs";
import { AppShell, AppShellMain } from "@mantine/core";
import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import prisma from "@/prisma/db";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";

async function layout({ children }: { children: React.ReactNode }) {
    const clerkUser = await currentUser();

    if (clerkUser) {
        const newUser = {
            email: clerkUser?.emailAddresses[0]?.emailAddress,
            name: `${clerkUser?.firstName} ${clerkUser?.lastName}`,
            clerkId: clerkUser?.id,
            image: clerkUser?.imageUrl,
            role: "USER",
        } as User;

        const existingUser = await prisma.user.findFirst({
            where: {
                clerkId: clerkUser.id,
            },
        });

        if (!existingUser) {
            await prisma.user.create({ data: newUser });
        }

        if (existingUser?.role === "ADMIN") {
            redirect("/dashboard/admin");
        } else if (existingUser?.role === "USER") {
            redirect("/dashboard");
        }
    }
    return (
        <AppShell header={{ height: 60 }}>
            <Header isAuthenticated={false} />
            <AppShellMain>{children}</AppShellMain>
        </AppShell>
    );
}

export default layout;
