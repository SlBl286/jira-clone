import { getCurrent } from "@/features/auth/queries"
import { redirect } from "next/navigation";

export default async function WorkspaceIdPage({params}:any) {
    const user = await getCurrent();
    const { workspaceId } = await params
    if(!user) redirect("/sign-in")
  return (
    <div>WorkspaceIdPage : {workspaceId}</div>
  )
}
