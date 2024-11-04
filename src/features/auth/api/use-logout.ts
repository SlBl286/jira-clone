import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ReponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ReponseType, Error>({
    mutationFn: async () => {
      const respone = await client.api.auth.logout["$post"]();
      if(!respone.ok) {
        throw new Error("Failed to log out")
      }
      return await respone.json();
    },
    onSuccess: () => {
      toast.success("Logged out");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });

    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });

  return mutation;
};
