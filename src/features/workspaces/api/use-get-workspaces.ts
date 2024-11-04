import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaces = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      try {
        const respone = await client.api.workspaces["$get"]();
        if (!respone.ok) {
          throw new Error("failed to get workspaces")
        }

        const { data } = await respone.json();

        return data;
      } catch (error) {
        return null;
      }
    },
  });

  return query;
};
