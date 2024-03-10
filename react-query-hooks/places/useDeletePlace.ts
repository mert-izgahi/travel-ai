import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

function useDeletePlace(id: string) {
    const queryClient = useQueryClient();
    const { mutate: deletePlace, isPending: isDeletePlacePending } =
        useMutation({
            mutationKey: ["delete-place", id],
            mutationFn: async (id: string) => {
                await axios.delete(`/api/places/${id}`);
            },
            onSuccess: () => {
                toast.success("Place deleted successfully");
                queryClient.invalidateQueries({
                    queryKey: ["places"],
                });
            },
            onError: (error) => {
                toast.error("Could not delete place");
            },
        });

    return {
        deletePlace,
        isDeletePlacePending,
    };
}

export default useDeletePlace;
