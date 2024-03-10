import { placeInputSchema } from "@/lib/validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

function useCreatePlace() {
    const queryClient = useQueryClient();
    const { mutate: createPlace, isPending: isCreatePlacePending } =
        useMutation({
            mutationKey: ["create-place"],
            mutationFn: async (args: z.infer<typeof placeInputSchema>) => {
                await axios.post("/api/places", args);
            },
            onSuccess: () => {
                toast.success("Place created successfully");
                queryClient.invalidateQueries({
                    queryKey: ["places"],
                });
            },
            onError: (error) => {
                toast.error("Could not create place");
            },
        });

    return {
        createPlace,
        isCreatePlacePending,
    };
}

export default useCreatePlace;
