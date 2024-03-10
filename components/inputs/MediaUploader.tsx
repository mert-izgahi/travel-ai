"use client";

import React, { useEffect, useState } from "react";

import {
    ActionIcon,
    Button,
    FileButton,
    Flex,
    Image,
    InputError,
    InputWrapper,
    Paper,
    Stack,
} from "@mantine/core";
import { IoTrashOutline, IoCloudUploadOutline } from "react-icons/io5";
import { UseFormReturnType } from "@mantine/form";
import { z } from "zod";
import { placeInputSchema } from "@/lib/validations";
import axios from "axios";
const ImgBox = ({ url, onRemove }: { url: string; onRemove?: () => void }) => (
    <Paper
        style={{ height: 200 }}
        bg={"gray.1"}
        radius={"md"}
        w={"200px"}
        h={"200px"}
        pos={"relative"}
    >
        <Image
            style={{
                height: 200,
                width: "100%",
                objectFit: "cover",
            }}
            radius={"md"}
            src={url}
        />
        <ActionIcon
            pos={"absolute"}
            top={5}
            right={5}
            variant="light"
            color="red"
            onClick={onRemove}
        >
            <IoTrashOutline />
        </ActionIcon>
    </Paper>
);

function MediaUploader({
    form,
}: {
    form: UseFormReturnType<z.infer<typeof placeInputSchema>>;
}) {
    const [selected, setSelected] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const [images, setImages] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const handleSelect = (files: any) => {
        setSelected(false);
        setFiles(files);
        const images = files.map((file: any) => {
            const _image = URL.createObjectURL(file) as string;
            return _image;
        });
        setImages((prev) => [...prev, ...images]);
        setSelected(true);
    };

    const onCloudinaryUpload = async () => {
        setIsUploading(true);
        const promises = files.map((file) => {
            return new Promise((resolve, reject) => {
                try {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append(
                        "upload_preset",
                        process.env
                            .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
                    );

                    axios
                        .post(
                            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                            formData
                        )
                        .then((res) => {
                            resolve(res.data.secure_url);
                        })
                        .catch((err) => {
                            reject(err);
                            setIsUploading(false);
                        })
                        .finally(() => {
                            setIsUploading(false);
                        });
                } catch (error) {
                    reject(error);
                    setIsUploading(false);
                }
            });
        });
        const urls = await Promise.all(promises);

        if (urls.length > 0) {
            form.setFieldValue("images", urls as string[]);
        }
        setIsUploading(false);
    };

    useEffect(() => {
        if (form.values.images) {
            setImages(form.values.images);
        }
    }, [form.values.images]);
    return (
        <Stack>
            <InputWrapper>
                <Flex align={"center"} gap={"md"}>
                    {images.map((url) => (
                        <ImgBox
                            key={url}
                            url={url}
                            onRemove={() => {
                                form.setFieldValue(
                                    "images",
                                    images.filter((u) => u !== url)
                                );
                                setImages((prev) =>
                                    prev.filter((u) => u !== url)
                                );
                            }}
                        />
                    ))}
                </Flex>
                <Flex align={"center"} gap={"md"} mt={"md"}>
                    <FileButton multiple onChange={handleSelect}>
                        {(props) => (
                            <Button fullWidth disabled={isUploading} {...props}>
                                Select Media
                            </Button>
                        )}
                    </FileButton>

                    <Button
                        fullWidth
                        leftSection={<IoCloudUploadOutline />}
                        onClick={onCloudinaryUpload}
                        loading={isUploading}
                        disabled={isUploading}
                    >
                        Upload
                    </Button>

                    <Button
                        fullWidth
                        leftSection={<IoCloudUploadOutline />}
                        onClick={() => {
                            form.setFieldValue("images", []);
                            setImages([]);
                        }}
                        variant="light"
                        color="red"
                        disabled={isUploading}
                    >
                        Clear All
                    </Button>
                </Flex>
            </InputWrapper>

            <InputError>{form.errors.images}</InputError>
        </Stack>
    );
}

export default MediaUploader;
