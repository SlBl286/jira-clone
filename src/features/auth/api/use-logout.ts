import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { useRouter } from "next/navigation"

type ReponseType = InferResponseType<typeof client.api.auth.logout["$post"]>


export const useLogout = () => {
    const router = useRouter()
    const queryClient = useQueryClient();
    const mutation = useMutation<ReponseType, Error>({
        mutationFn: async () => {
            const respone = await client.api.auth.logout["$post"]();
            return await respone.json();
        },
        onSuccess: () => {
            router.refresh()
            queryClient.invalidateQueries({ queryKey: ["current"] })
        }
    })

    return mutation;
}