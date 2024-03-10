import { Button, Center, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import React from "react";

function HomePage() {
    return (
        <Center h={"calc(100vh - 60px)"}>
            <Stack align="center">
                <Title>Travel AI</Title>
                <Text>Powered by OpenAI, Next.js, Mantine, and Clerk</Text>

                <Button component={Link} href="/sign-in">
                    Sign In
                </Button>
            </Stack>
        </Center>
    );
}

export default HomePage;
