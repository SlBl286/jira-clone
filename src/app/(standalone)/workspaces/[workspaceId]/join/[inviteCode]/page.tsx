import { getCurrent } from "@/features/auth/queries";
import { JoinWorkspceForm } from "@/features/workspaces/components/join-workspace-form";
import { getWorkspaceInfo } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";

type WorkspaceIdJoinPageProps = {
  params: {
    workspaceId: string;
    inviteCode : string;
  };
};
const WorkspaceIdJoinPage = async ({ params }: WorkspaceIdJoinPageProps) => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");
  const initialValues = await getWorkspaceInfo({ workspaceId: params.workspaceId });

  if(!initialValues){
    redirect("/")
  }
  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspceForm
        initialValues={initialValues}
      />
    </div>
  );
};

export default WorkspaceIdJoinPage;
