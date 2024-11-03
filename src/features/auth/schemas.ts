
import z from "zod";

const loginSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(8, "Minimum 8 character"),
});

const registerSchema = z.object({
    name: z.string().trim().min(1, "Required"),
    email: z.string().trim().email(),
    password: z.string().min(8, "Minimum 8 character"),
  });

export {loginSchema,registerSchema }