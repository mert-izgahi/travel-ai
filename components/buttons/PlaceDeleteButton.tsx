import useDeletePlace from "@/react-query-hooks/places/useDeletePlace";
import { ActionIcon, Button, Flex, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { IoTrash } from "react-icons/io5";
interface Props {
    id: string;
}
function PlaceDeleteButton({ id }: Props) {
    const [opened, { open, close }] = useDisclosure(false);

    const { deletePlace, isDeletePlacePending } = useDeletePlace(id);

    return (
        <>
            <ActionIcon variant="outline" onClick={open}>
                <IoTrash />
            </ActionIcon>
            <Modal title="Delete place" opened={opened} onClose={close}>
                <Text>Are you sure you want to delete this place?</Text>

                <Flex mt="md" gap={"md"} justify={"flex-end"}>
                    <Button
                        onClick={() => {
                            close();
                        }}
                        variant="outline"
                    >
                        Cancel
                    </Button>
                    <Button
                        color="red"
                        onClick={async () => {
                            await deletePlace(id);
                            close();
                        }}
                        disabled={isDeletePlacePending}
                        loading={isDeletePlacePending}
                    >
                        Delete
                    </Button>
                </Flex>
            </Modal>
        </>
    );
}

export default PlaceDeleteButton;
