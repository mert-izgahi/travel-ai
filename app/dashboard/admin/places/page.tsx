import React from "react";
import {
    dehydrate,
    QueryClient,
    HydrationBoundary,
} from "@tanstack/react-query";
import PlacesTable from "@/components/tables/PlacesTable";
import { Container } from "@mantine/core";
function PlacesPage() {
    const client = new QueryClient();
    return (
        <HydrationBoundary state={dehydrate(client)}>
            <Container size="xl" py={"xl"}>
                <PlacesTable />
            </Container>
        </HydrationBoundary>
    );
}

export default PlacesPage;
