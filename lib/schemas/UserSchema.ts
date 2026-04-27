import * as z from "zod";
const UserSchema = z.object({
  name: z.string(),
  username: z.string().min(3).max(20),
  email: z.email(),
  image: z.url(),
});

export default UserSchema;
