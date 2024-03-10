import { placeInputSchema } from "@/lib/validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

function useUpdatePlace(id: string) {
    const queryClient = useQueryClient();
    const { mutate: updatePlace, isPending: isUpdatingPlacePending } =
        useMutation({
            mutationKey: ["update-place", id],
            mutationFn: async (args: z.infer<typeof placeInputSchema>) => {
                await axios.put(`/api/places/${id}`, args);
            },
            onSuccess: () => {
                toast.success("Place updated successfully");
                queryClient.invalidateQueries({
                    queryKey: ["places"],
                });
                queryClient.invalidateQueries({
                    queryKey: ["place", id],
                });
            },
            onError: (error) => {
                console.log(error);
            },
        });

    return {
        updatePlace,
        isUpdatingPlacePending,
    };
}

export default useUpdatePlace;
