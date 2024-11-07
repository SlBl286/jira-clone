import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { sessionMiddleware } from "@/lib/session-middlewares";
import {
  DATABASE_ID,
  IMAGES_BUCKET_ID,
  PROJECTS_ID,
} from "@/config";
import { ID, Query } from "node-appwrite";
import { getMember } from "@/features/members/utils";
import { z } from "zod";
import { createProjectSchema } from "../shemas";


const app = new Hono()
  .get("/", sessionMiddleware, zValidator("query",z.object({workspaceId : z.string()})),async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");
    const {workspaceId} = c.req.valid("query")
    const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });
      if(!member){
        return c.json({error : "Unauthorized"},401)
      }
    const projects = await databases.listDocuments(DATABASE_ID, PROJECTS_ID, [
      Query.equal("workspaceId", workspaceId),
      Query.orderDesc("$createdAt"),
    ]);


    return c.json({ data: projects });
  })
  .post(
    "/",
    zValidator("form", createProjectSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");
      const storage = c.get("storage");
      const { name, image,workspaceId } = c.req.valid("form");

      const member = getMember({databases,workspaceId,userId:user.$id})

      if(!member) {
        return c.json({error : "Unauthorized"},401)
      }
      let uploadedImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID,
          file.$id
        );
        uploadedImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      }

      const project = await databases.createDocument(
        DATABASE_ID,
        PROJECTS_ID,
        ID.unique(),
        {
          name,
          workspaceId: workspaceId,
          imageUrl: uploadedImageUrl,
          
        }
      )
      return c.json({ data: project });
    }
  )
//   .patch(
//     "/:workspaceId",
//     sessionMiddleware,
//     zValidator("form", updateWorkspaceSchema),
//     async (c) => {
//       const databases = c.get("databases");
//       const storage = c.get("storage");
//       const user = c.get("user");

//       const { workspaceId } = c.req.param();
//       const { name, image } = c.req.valid("form");

//       const member = await getMember({
//         databases,
//         workspaceId,
//         userId: user.$id,
//       });

//       if (!member || member.role !== MemberRole.ADMIN) {
//         return c.json({ error: "Unauthorized" }, 401);
//       }

//       let uploadedImageUrl: string | undefined;

//       if (image instanceof File) {
//         const file = await storage.createFile(
//           IMAGES_BUCKET_ID,
//           ID.unique(),
//           image
//         );

//         const arrayBuffer = await storage.getFilePreview(
//           IMAGES_BUCKET_ID,
//           file.$id
//         );
//         uploadedImageUrl = `data:image/png;base64,${Buffer.from(
//           arrayBuffer
//         ).toString("base64")}`;
//       } else {
//         uploadedImageUrl = image;
//       }

//       const workspace = await databases.updateDocument(
//         DATABASE_ID,
//         WORKSPACES_ID,
//         workspaceId,
//         {
//           name,
//           imageUrl: uploadedImageUrl,
//         }
//       );

//       return c.json({ data: workspace });
//     }
//   )
//   .delete("/:workspaceId", sessionMiddleware, async (c) => {
//     const databases = c.get("databases");
//     const user = c.get("user");

//     const { workspaceId } = c.req.param();

//     const member = await getMember({
//       databases,
//       workspaceId,
//       userId: user.$id,
//     });

//     if (!member || member.role !== MemberRole.ADMIN) {
//       return c.json({ error: "Unauthorized" }, 401);
//     }

//     await databases.deleteDocument(DATABASE_ID, WORKSPACES_ID, workspaceId);

//     return c.json({ data: { $id: workspaceId } });
//   })
//   .post("/:workspaceId/reset-invite-code", sessionMiddleware, async (c) => {
//     const databases = c.get("databases");
//     const user = c.get("user");

//     const { workspaceId } = c.req.param();

//     const member = await getMember({
//       databases,
//       workspaceId,
//       userId: user.$id,
//     });

//     if (!member || member.role !== MemberRole.ADMIN) {
//       return c.json({ error: "Unauthorized" }, 401);
//     }

//     const workspace = await databases.updateDocument(
//       DATABASE_ID,
//       WORKSPACES_ID,
//       workspaceId,
//       {
//         inviteCode: generateInviteCode(6),
//       }
//     );

//     return c.json({ data: workspace });
//   })
//   .post(
//     "/:workspaceId/join",
//     sessionMiddleware,
//     zValidator("json", z.object({ code: z.string() })),
//     async (c) => {
//       const { workspaceId } = c.req.param();

//       const { code } = c.req.valid("json");

//       const databases = c.get("databases");
//       const user = c.get("user");

//       const member = await getMember({
//         databases,
//         workspaceId,
//         userId: user.$id,
//       });

//       if (member) {
//         return c.json({ error: "Already a member" }, 400);
//       }

//     }
//   );
export default app;
