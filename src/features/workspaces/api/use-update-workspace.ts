import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner"
type ReponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["$patch"],200>
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["$patch"]>


export const useUpdateWorkspace = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ReponseType, Error, RequestType>({
        mutationFn: async (form) => {
            const respone = await client.api.workspaces[":workspaceId"]["$patch"](form);
            if(!respone.ok) {
                throw new Error("Failed to update workspace.")
              }
            return await respone.json();
        },
        onSuccess: ({data}) => {
            toast.success("Workspace updated")
            queryClient.invalidateQueries({ queryKey: ["workspaces"] })
            queryClient.invalidateQueries({ queryKey: ["workspaces",data.$id] })

        },
        onError: ()=> {
            toast.error("Failed to create workspace")

        }
    })

    return mutation;
}