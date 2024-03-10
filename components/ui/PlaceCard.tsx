import { Card, CardSection, Image, Text } from "@mantine/core";
import { Place } from "@prisma/client";
import React from "react";

function PlaceCard({ place }: { place: Place }) {
    return (
        <Card withBorder radius={"md"} shadow={"sm"}>
            <CardSection>
                <Image h={"300px"} src={place.images[0]} alt={place.name} />
            </CardSection>
            <CardSection p="md">
                <Text fw={"bolder"} size="xl">
                    {place.name}
                </Text>
                <Text>{place.description}</Text>
            </CardSection>
        </Card>
    );
}

export default PlaceCard;
