import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetPlaces() {
    const { data: places, isLoading: isLoadingPlaces } = useQuery({
        queryKey: ["places"],
        queryFn: async () => {
            const response = await axios.get("/api/places");
            const data = await response.data;
            return data.result;
        },
    });

    return {
        places,
        isLoadingPlaces,
    };
}

export default useGetPlaces;
