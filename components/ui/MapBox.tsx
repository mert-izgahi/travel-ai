"use client";

import React, { useEffect, useMemo, useRef } from "react";
import Map, { Marker, NavigationControl, GeolocateControl } from "react-map-gl";
import { ActionIcon, Paper, Popover, Text } from "@mantine/core";
import { IoLocationOutline } from "react-icons/io5";
interface Props {
    location: string;
    longitude: number;
    latitude: number;
}

function MapBox({ location, longitude, latitude }: Props) {
    const mapRef = useRef<any>();

    const initialViewState = useMemo(() => {
        return {
            longitude: longitude || 39.925533,
            latitude: latitude || 32.866287,
            zoom: 10,
        };
    }, [longitude, latitude]);

    useEffect(() => {
        if (!longitude || !latitude) return;
        if (!mapRef.current) return;
        mapRef.current.jumpTo({
            center: [longitude, latitude],
        });
    }, [longitude, latitude]);

    return (
        <Paper
            component={Map}
            radius="sm"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
            initialViewState={initialViewState}
            style={{ width: "100%", height: 400 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            // maxZoom={20}
            // minZoom={2}
            scrollZoom={false}
            ref={mapRef}
        >
            {/* <GeolocateControl position="top-left" />
            <NavigationControl position="top-left" /> */}

            <Marker latitude={latitude} longitude={longitude} draggable={false}>
                <Popover>
                    <Popover.Target>
                        <ActionIcon>
                            <IoLocationOutline />
                        </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Text>{location}</Text>
                    </Popover.Dropdown>
                </Popover>
            </Marker>
        </Paper>
    );
}

export default MapBox;
