"use client";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import useCurrentUser from "@/react-query-hooks/auth/useCurrentUser";
import { AppShell, AppShellMain } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure(false);
    const { currentUser, isLoadingCurrentUser } = useCurrentUser();
    if (isLoadingCurrentUser) return null;
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { desktop: false, mobile: !opened },
            }}
        >
            <Header
                isAuthenticated={true}
                collapsed={opened}
                toggle={() => toggle()}
            />

            <Sidebar role={currentUser?.role} />

            <AppShellMain>{children}</AppShellMain>
        </AppShell>
    );
}

export default layout;
