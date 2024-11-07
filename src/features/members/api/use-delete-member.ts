import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
type ReponseType = InferResponseType<
  (typeof client.api.members)[":memberId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.members)[":memberId"]["$delete"]
>;

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ReponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const respone = await client.api.members[":memberId"]["$delete"]({
        param,
      });
      if (!respone.ok) {
        throw new Error("Failed to delete member.");
      }
      return await respone.json();
    },
    onSuccess: ({data}) => {
      toast.success("Member deleted");
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["member",data.$id] });

    },
    onError: () => {
      toast.error("Failed to delete member");
    },
  });

  return mutation;
};
