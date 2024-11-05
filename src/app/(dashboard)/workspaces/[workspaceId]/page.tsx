import { getCurrent } from "@/features/auth/queries"
import { redirect } from "next/navigation";

export default async function WorkspaceIdPage({params}: any) {
    const user = await getCurrent();

    if(!user) redirect("/sign-in")
  return (
    <div>WorkspaceIdPage : {params.workspaceId}</div>
  )
}
