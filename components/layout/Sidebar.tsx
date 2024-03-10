"use client";

import { AppShellNavbar, NavLink, Stack } from "@mantine/core";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import {
    IoHomeOutline,
    IoPaperPlaneOutline,
    IoAddOutline,
    IoPersonOutline,
    IoPeopleOutline,
    IoBookmarkOutline,
    IoSettingsOutline,
    IoAppsOutline,
} from "react-icons/io5";

interface Props {
    role: "USER" | "ADMIN";
}
function Sidebar({ role }: Props) {
    const pathname = usePathname();
    const isAdminPage = useMemo(() => {
        return pathname.includes("/dashboard/admin");
    }, [pathname]);
    const adminLinks = [
        {
            label: "Dashboard",
            link: "/dashboard/admin",
            icon: <IoHomeOutline />,
        },

        {
            label: "Users",
            link: "/dashboard/admin/users",
            icon: <IoPeopleOutline />,
        },

        {
            label: "Places",
            link: "/dashboard/admin/places",
            icon: <IoPaperPlaneOutline />,
        },

        {
            label: "Add Place",
            link: "/dashboard/admin/places/create",
            icon: <IoAddOutline />,
        },

        {
            label: "Settings",
            link: "/dashboard/admin/settings",
            icon: <IoSettingsOutline />,
        },

        {
            label: "Application",
            link: "/dashboard",
            icon: <IoAppsOutline />,
        },
    ];

    const userLinks = [
        {
            label: "Places",
            link: "/dashboard/places",
            icon: <IoPaperPlaneOutline />,
        },
        {
            label: "Profile",
            link: "/profile",
            icon: <IoHomeOutline />,
        },

        {
            label: "Bookmarks",
            link: "/bookmarks",
            icon: <IoBookmarkOutline />,
        },

        {
            label: "Settings",
            link: "/settings",
            icon: <IoSettingsOutline />,
        },

        {
            label: "Sign Out",
            link: "/sign-out",
            icon: <IoPersonOutline />,
        },
    ];

    const adminMenu = (
        <Stack>
            {adminLinks.map((link) => (
                <NavLink
                    label={link.label}
                    key={link.label}
                    leftSection={link.icon}
                    href={link.link}
                    active={pathname === link.link}
                />
            ))}
        </Stack>
    );

    const userMenu = (
        <Stack>
            {userLinks.map((link) => (
                <NavLink
                    label={link.label}
                    key={link.label}
                    leftSection={link.icon}
                    href={link.link}
                    active={pathname === link.link}
                />
            ))}
        </Stack>
    );

    return (
        <AppShellNavbar p="md">
            {isAdminPage && role === "ADMIN" ? adminMenu : userMenu}
        </AppShellNavbar>
    );
}

export default Sidebar;
