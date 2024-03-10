import { ActionIcon } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { IoPencil } from "react-icons/io5";
interface Props {
    id: string;
}
function PlaceEditButton({ id }: Props) {
    return (
        <ActionIcon
            variant="outline"
            component={Link}
            href={`/dashboard/admin/places/${id}`}
        >
            <IoPencil />
        </ActionIcon>
    );
}

export default PlaceEditButton;
