import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
type ReponseType = InferResponseType<typeof client.api.projects[":projectId"]["$patch"],200>
type RequestType = InferRequestType<typeof client.api.projects[":projectId"]["$patch"]>


export const useUpdateProject = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<ReponseType, Error, RequestType>({
        mutationFn: async ({form,param}) => {
            const respone = await client.api.projects[":projectId"]["$patch"]({form,param});
            if(!respone.ok) {
                throw new Error("Failed to update project.")
              }
            return await respone.json();
        },
        onSuccess: ({data}) => {
            toast.success("Project updated")
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["projects"] })
            queryClient.invalidateQueries({ queryKey: ["project",data.$id] })

        },
        onError: ()=> {
            toast.error("Failed to create project")

        }
    })

    return mutation;
}