import React from "react";
import {
    dehydrate,
    QueryClient,
    HydrationBoundary,
} from "@tanstack/react-query";
import PlacesGrid from "@/components/ui/PlacesGrid";
import { Container } from "@mantine/core";
function PlacesPage() {
    const client = new QueryClient();
    return (
        <HydrationBoundary state={dehydrate(client)}>
            <Container size="xl" py={"xl"}>
                <PlacesGrid />
            </Container>
        </HydrationBoundary>
    );
}

export default PlacesPage;
