"use client";

import useGetPlaces from "@/react-query-hooks/places/useGetPlaces";
import { Grid, GridCol } from "@mantine/core";
import { Place } from "@prisma/client";
import React from "react";
import PlaceCard from "./PlaceCard";

function PlacesGrid() {
    const { places, isLoadingPlaces } = useGetPlaces();
    return (
        <Grid>
            {places?.map((place: Place) => (
                <GridCol key={place.id} span={4}>
                    <PlaceCard place={place} />
                </GridCol>
            ))}
        </Grid>
    );
}

export default PlacesGrid;
