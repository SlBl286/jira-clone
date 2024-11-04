import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type ReponseType = InferResponseType<typeof client.api.auth.register["$post"]>
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>


export const useRegister = () => {
    const router = useRouter();
    const queryClient = useQueryClient();


    const mutation = useMutation<ReponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const respone = await client.api.auth.register["$post"](json);
            if(!respone.ok) {
                throw new Error("Failed to register")
              }
            return await respone.json();
        },
        onSuccess: ()=> {
            toast.success("Account created")
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["current"] })
        },
        onError: ()=> {
            toast.error("Failed to register.")
        }
    })

    return mutation;
}