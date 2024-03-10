import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useCurrentUser() {
    const { data: currentUser, isLoading: isLoadingCurrentUser } = useQuery({
        queryKey: ["current-user"],

        queryFn: async () => {
            try {
                const response = await axios.get("/api/auth/me");
                if (response.status === 200) {
                    const data = await response.data;
                    return data.result;
                }
                return null;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    });
    return {
        currentUser,
        isLoadingCurrentUser,
    };
}

export default useCurrentUser;
