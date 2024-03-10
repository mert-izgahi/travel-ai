"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import GoogleAutoCompleteInput from "../inputs/GoogleAutoCompleteInput";
import { placeInputSchema } from "@/lib/validations";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import MapBox from "../ui/MapBox";
import {
    Button,
    Flex,
    Grid,
    GridCol,
    Select,
    TextInput,
    Textarea,
} from "@mantine/core";
import MediaUploader from "../inputs/MediaUploader";
import { ICity, cities, countries } from "country-cities";
import useCreatePlace from "@/react-query-hooks/places/useCreatePlace";
import useGetPlace from "@/react-query-hooks/places/useGetPlace";
import useUpdatePlace from "@/react-query-hooks/places/useUpdatePlace";
import { useRouter } from "next/navigation";

interface Props {
    placeId?: string;
    mode?: "edit" | "create";
}

function PlaceForm({ placeId, mode }: Props) {
    const router = useRouter();
    const form = useForm<z.infer<typeof placeInputSchema>>({
        initialValues: {
            name: "",
            description: "",
            location: "",
            latitude: 0,
            longitude: 0,
            city: "",
            country: "",
            images: [],
        },
        validate: zodResolver(placeInputSchema),
    });

    const countriesOptions = useMemo(() => {
        return countries.all().map((country) => ({
            label: country.name,
            value: country.isoCode,
        }));
    }, [countries]);

    const citiesOptions = useCallback(
        (countryCode: string) => {
            const _cities: ICity[] | undefined =
                cities.getByCountry(countryCode);
            if (_cities) {
                return _cities.map((city, index) => ({
                    label: city.name,
                    value: `${index}-${city.stateCode}-${city.name}`,
                }));
            }
        },
        [cities]
    );
    const { createPlace, isCreatePlacePending } = useCreatePlace();
    const { updatePlace, isUpdatingPlacePending } = useUpdatePlace(
        placeId as string
    );
    const { place, isLoadingPlace } = useGetPlace(placeId as string);
    const onSubmit = async (values: z.infer<typeof placeInputSchema>) => {
        if (mode === "edit") {
            await updatePlace(values);
        } else {
            await createPlace(values);
            form.reset();
            router.push("/dashboard/admin/places");
        }
    };

    useEffect(() => {
        if (place) {
            form.setValues(place);
        }
    }, [place]);

    return (
        <form noValidate onSubmit={form.onSubmit(onSubmit)}>
            <Grid columns={2}>
                <GridCol span={2}>
                    <Flex justify={"flex-end"}>
                        <Button
                            disabled={
                                isCreatePlacePending || isUpdatingPlacePending
                            }
                            loading={
                                isCreatePlacePending || isUpdatingPlacePending
                            }
                            type="submit"
                        >
                            {mode === "edit" ? "Update" : "Create"}
                        </Button>
                    </Flex>
                </GridCol>
                <GridCol span={2}>
                    <GoogleAutoCompleteInput form={form} />
                </GridCol>

                <GridCol span={1}>
                    <Select
                        label="Country"
                        placeholder="Country"
                        searchable
                        allowDeselect={false}
                        {...form.getInputProps("country")}
                        data={countriesOptions}
                    />
                </GridCol>

                <GridCol span={1}>
                    <Select
                        label="City"
                        placeholder="City"
                        {...form.getInputProps("city")}
                        searchable
                        allowDeselect={false}
                        data={citiesOptions(
                            form.values.country ? form.values.country : "TR"
                        )}
                    />
                </GridCol>

                <GridCol span={2}>
                    <MapBox
                        location={form.values.location}
                        longitude={form.values.longitude}
                        latitude={form.values.latitude}
                    />
                </GridCol>
                <GridCol span={2}>
                    <MediaUploader form={form} />
                </GridCol>

                <GridCol span={2}>
                    <TextInput
                        label="Name"
                        placeholder="Name"
                        {...form.getInputProps("name")}
                    />
                </GridCol>

                <GridCol span={2}>
                    <Textarea
                        label="Description"
                        placeholder="Description"
                        {...form.getInputProps("description")}
                    />
                </GridCol>
            </Grid>
        </form>
    );
}

export default PlaceForm;
