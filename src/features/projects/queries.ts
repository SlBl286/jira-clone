"use server";

import { cookies } from "next/headers";
import { Account, Client, Databases, Query } from "node-appwrite";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { DATABASE_ID, MEMBERS_ID, PROJECTS_ID, WORKSPACES_ID } from "@/config";
import { getMember } from "../members/utils";
import { createSessionClient } from "@/lib/appwrite";
import { Project } from "./types";

export const getProjects = async () => {
  try {
    const { databases, account } = await createSessionClient();
    const user = await account.get();

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (members.total === 0) {
      return { documents: [], total: 0 };
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);
    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
    );
    return workspaces;
  } catch {
    return { documents: [], total: 0 };
  }
};

type GetProjectProps = {
  projectId : string;
};

export const getProject = async ({ projectId }: GetProjectProps) => {

    const { databases, account } = await createSessionClient();
    const user = await account.get();

    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    );
    const member = getMember({ databases, workspaceId: project.workspaceId, userId: user.$id });

    if (!member) {
      throw new Error("Unauthorized");
    }

    return project;
};

// type GetWorkspaceInfoProps = {
//   workspaceId: string;
// };

// export const getWorkspaceInfo = async ({ workspaceId }: GetWorkspaceInfoProps) => {
//   try {
//     const { databases } = await createSessionClient();

//     const workspace = await databases.getDocument<Workspace>(
//       DATABASE_ID,
//       WORKSPACES_ID,
//       workspaceId
//     );
//     return {
//       name : workspace.name,
//     };
//   } catch {
//     return null;
//   }
// };
