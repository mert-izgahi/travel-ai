"use client";
import useGetPlaces from "@/react-query-hooks/places/useGetPlaces";
import React from "react";
import { DataTable } from "mantine-datatable";
import { Flex } from "@mantine/core";
import PlaceEditButton from "../buttons/PlaceEditButton";
import PlaceDeleteButton from "../buttons/PlaceDeleteButton";
import { Place } from "@prisma/client";
function PlacesTable() {
    const { places, isLoadingPlaces } = useGetPlaces();
    const columns = [
        {
            accessor: "name",
            title: "Name",
        },
        {
            accessor: "city",
            title: "City",
        },
        {
            accessor: "country",
            title: "Country",
        },
        {
            accessor: "actions",
            title: "Actions",
            textAlign: "right",
            render: (row: Place) => {
                return (
                    <Flex gap={"md"} justify={"flex-end"}>
                        <PlaceEditButton id={row.id} />
                        <PlaceDeleteButton id={row.id} />
                    </Flex>
                );
            },
        },
    ];

    // @ts-ignore
    return <DataTable columns={columns} records={places} />;
}

export default PlacesTable;
