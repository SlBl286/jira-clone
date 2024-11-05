import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
type ReponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"]
>;

export const useJoinWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ReponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const respone = await client.api.workspaces[":workspaceId"]["join"][
        "$post"
      ]({
        param,
        json,
      });
      if (!respone.ok) {
        throw new Error("Failed to join workspace.");
      }
      return await respone.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Joined workspace");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
