import { getCurrent } from "@/features/auth/queries";
import { EditprojectForm } from "@/features/projects/components/edit-project-form";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";
import React from "react";

async function ProjectSettingPage({ params }: any) {
  const user = await getCurrent();
  const { projectId } = await params;
  if (!user) redirect("/sign-in");

  const initialValues = await getProject({
    projectId,
  });
  return (
    <div className="w-full lg:max-w-xl">
       <EditprojectForm initialValues={initialValues}/>
    </div>
  );
}

export default ProjectSettingPage;
