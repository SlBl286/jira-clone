import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
type UseGetProjectsProps = {
    workspaceId : string;
}
export const useGetProjects = ({workspaceId}:UseGetProjectsProps) => {
  const query = useQuery({
    queryKey: ["projects",workspaceId],
    queryFn: async () => {
      try {
        const respone = await client.api.projects.$get({query: {workspaceId}});
        if (!respone.ok) {
          throw new Error("failed to get projects")
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
