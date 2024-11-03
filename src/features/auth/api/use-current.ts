import { client } from "@/lib/rpc"
import { useQuery } from "@tanstack/react-query"

export const useCurrent = () => {
    const query = useQuery({
        queryKey: ["current"],
        queryFn: async () => {
            try {
                const respone = await client.api.auth.current["$get"]();
                if (!respone.ok) {
                    return null;
                }

                const { data } = await respone.json()

                return data;
            }
            catch(error){
                return null;
            }
        }
    })

    return query;
}