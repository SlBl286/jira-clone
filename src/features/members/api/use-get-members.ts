import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type UseGetMembersProps = {
  workspaceId: string;
};

export const useGetMembers = ({ workspaceId }: UseGetMembersProps) => {
  const query = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      try {
        const respone = await client.api.members["$get"]({
          query: { workspaceId },
        });
        if (!respone.ok) {
          throw new Error("failed to get members");
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
