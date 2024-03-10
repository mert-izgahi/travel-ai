import PlaceForm from "@/components/forms/PlaceForm";
import { Container } from "@mantine/core";
import React from "react";

function CreatePlacePage() {
    return (
        <Container size="xl" py={"xl"}>
            <PlaceForm />
        </Container>
    );
}

export default CreatePlacePage;
