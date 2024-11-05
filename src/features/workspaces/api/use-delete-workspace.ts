import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
type ReponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["$delete"]
>;

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ReponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const respone = await client.api.workspaces[":workspaceId"]["$delete"]({
        param,
      });
      if (!respone.ok) {
        throw new Error("Failed to delete workspace.");
      }
      return await respone.json();
    },
    onSuccess: ({data}) => {
      toast.success("Workspace deleted");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace",data.$id] });

    },
    onError: () => {
      toast.error("Failed to delete workspace");
    },
  });

  return mutation;
};
