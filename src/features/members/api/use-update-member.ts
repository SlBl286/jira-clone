import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner"
type ReponseType = InferResponseType<typeof client.api.members[":memberId"]["$patch"],200>
type RequestType = InferRequestType<typeof client.api.members[":memberId"]["$patch"]>


export const useUpdateMember = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ReponseType, Error, RequestType>({
        mutationFn: async ({param,json}) => {
            const respone = await client.api.members[":memberId"]["$patch"]({param,json});
            if(!respone.ok) {
                throw new Error("Failed to update member.")
              }
            return await respone.json();
        },
        onSuccess: ({data}) => {
            toast.success("Member updated")
            queryClient.invalidateQueries({ queryKey: ["members"] })
            queryClient.invalidateQueries({ queryKey: ["member",data.$id] })

        },
        onError: ()=> {
            toast.error("Failed to create member")

        }
    })

    return mutation;
}