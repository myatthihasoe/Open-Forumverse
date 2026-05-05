import * as z from "zod";

export const SigninOauthSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required!" }),
  user: z.object({
    username: z
      .string()
      .min(3, { message: "Username must at least 3 characters" }),
    email: z.email(),
    name: z.string().min(1, { message: "Name is required!" }),
    image: z.url().optional(),
  }),
});
