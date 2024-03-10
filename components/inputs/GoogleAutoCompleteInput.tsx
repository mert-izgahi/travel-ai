"use client";

import { Input, InputWrapper, Loader } from "@mantine/core";
import Autocomplete from "react-google-autocomplete";
import React, { useCallback, useState } from "react";
import { UseFormReturnType } from "@mantine/form";
import { z } from "zod";
import { placeInputSchema } from "@/lib/validations";
function GoogleAutoCompleteInput({
    form,
}: {
    form: UseFormReturnType<z.infer<typeof placeInputSchema>>;
}) {
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = useCallback(
        (place: any) => {
            try {
                setIsLoading(true);
                if (place) {
                    const location = place.formatted_address;
                    const { lat, lng } = place.geometry.location;

                    form.setFieldValue("location", location);
                    form.setFieldValue("latitude", lat);
                    form.setFieldValue("longitude", lng);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        },
        [form]
    );
    return (
        <InputWrapper label="Location" withAsterisk>
            <Input
                component={Autocomplete}
                onPlaceSelected={(place: any) => {
                    console.log(place);
                    handleChange(place);
                }}
                language="en"
                rightSection={isLoading ? <Loader size="xs" /> : null}
                options={{
                    types: ["address"],
                    // componentRestrictions: { country: "tr" },
                    fields: ["formatted_address", "geometry.location"],
                }}
                apiKey={process.env.NEXT_PUBLIC_GOOLGE_API_KEY}
                defaultValue={form.values.location}
            />
        </InputWrapper>
    );
}

export default GoogleAutoCompleteInput;
