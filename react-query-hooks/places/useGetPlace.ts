import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function useGetPlace(id: string) {
    const { data: place, isLoading: isLoadingPlace } = useQuery({
        queryKey: ["place", id],

        queryFn: async () => {
            const response = await axios.get(`/api/places/${id}`);
            const data = await response.data;

            return data.result;
        },
    });

    return {
        place,
        isLoadingPlace,
    };
}

export default useGetPlace;
