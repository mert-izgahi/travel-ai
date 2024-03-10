import { SignIn } from "@clerk/nextjs";
import {
    Card,
    CardSection,
    Center,
    Container,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import React from "react";

function SignInPage() {
    return (
        <Container>
            <Center h={"calc(100vh - 60px)"}>
                <Card withBorder radius="md">
                    <CardSection p="md">
                        <Title>Travel AI</Title>
                        <Text c="dimmed">
                            Powered by OpenAI, Next.js, Mantine, and Clerk
                        </Text>
                    </CardSection>
                    <CardSection p="md">
                        <SignIn afterSignInUrl="/dashboard" />
                    </CardSection>
                </Card>
            </Center>
        </Container>
    );
}

export default SignInPage;
