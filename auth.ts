import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { api } from "./lib/api";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import validateData from "./lib/validateData";
import SignInSchema from "./lib/schemas/SignInSchema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      async authorize(credentials) {
        const validationFields = validateData(credentials, SignInSchema);
        if (validationFields.success) {
          const {  email, password } = validationFields.data;
          const { data: existingAccount } =
            await api.accounts.getByProvider(email);
          if (!existingAccount) return null;

          const { data: existingUser } = await api.users.getById(
            existingAccount.userId.toString()
          );
          if (!existingUser) return null;

          const isValidPassword = await bcrypt.compare(
            password,
            existingAccount.password
          );
          if (isValidPassword) {
            return {
              id: existingUser.id,
              name: existingUser.name,
              username: existingUser.username,
              email: existingUser.email,
              image: existingUser.image,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.type === "credentials") return true;
      if (!account || !user) return false;
      const { success } = await api.auth.oauthSignin({
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        user: {
          name: user.name || "",
          email: user.email || "",
          image: user.image || "",
          username:
            account.provider === "github"
              ? (profile?.login as string)
              : (user?.name?.toLocaleLowerCase() as string),
        },
      });
      return success;
    },
    async jwt({ token, account }) {
      if (account) {
        const { success, data: accountData } = await api.accounts.getByProvider(
          account?.providerAccountId
        );
        if (!success || !accountData) return token;
        const userId = accountData?.userId;
        if (userId) {
          token.sub = userId;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;

      return session;
    },
  },

  // debug: process.env.NODE_ENV === "development",
});
