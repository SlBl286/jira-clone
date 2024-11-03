import { client } from "@/lib/rpc"
import { useMutation } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"

type ReponseType = InferResponseType<typeof client.api.auth.register["$post"]>
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>


export const useRegister = () => {
    const mutation = useMutation<ReponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const respone = await client.api.auth.register["$post"](json);

            return await respone.json();
        }
    })

    return mutation;
}