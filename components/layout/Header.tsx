"use client";

import { UserButton } from "@clerk/nextjs";
import {
    AppShellHeader,
    Box,
    Burger,
    Button,
    Flex,
    Group,
    Text,
} from "@mantine/core";
import Link from "next/link";
import React from "react";

function Header({
    isAuthenticated,
    collapsed,
    toggle,
}: {
    isAuthenticated: boolean;
    collapsed?: boolean;
    toggle?: () => void;
}) {
    return (
        <AppShellHeader px={"md"} bg={"dark"}>
            <Group align="center" h={60}>
                <Flex align="center" gap={"xs"}>
                    {toggle && (
                        <Burger
                            opened={collapsed}
                            onClick={toggle}
                            size="sm"
                            color="white"
                            hiddenFrom="sm"
                        />
                    )}
                    <Text
                        fw={"bolder"}
                        size="xl"
                        c={"white"}
                        component={Link}
                        href="/"
                    >
                        TravelAI
                    </Text>
                </Flex>

                {isAuthenticated ? (
                    <Box ml={"auto"}>
                        <UserButton afterSignOutUrl="/" />
                    </Box>
                ) : (
                    <Button ml={"auto"} component={Link} href="/sign-in">
                        Get Started
                    </Button>
                )}
            </Group>
        </AppShellHeader>
    );
}

export default Header;
