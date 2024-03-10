import React from "react";
import {
    dehydrate,
    QueryClient,
    HydrationBoundary,
} from "@tanstack/react-query";
import PlaceForm from "@/components/forms/PlaceForm";
import { Container } from "@mantine/core";
interface Props {
    params: {
        placeId: string;
    };
}

function EditPlacePage({ params }: Props) {
    const { placeId } = params;
    const client = new QueryClient();
    return (
        <HydrationBoundary state={dehydrate(client)}>
            <Container size="xl" py={"xl"}>
                <PlaceForm mode="edit" placeId={placeId} />
            </Container>
        </HydrationBoundary>
    );
}

export default EditPlacePage;
