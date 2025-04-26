import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      uid: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    jwt({ token, user }) {
      // Add custom data to the token
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    session({ session, token }) {
      // Include custom data from the token in the session
      return {
        ...session,
        user: {
          ...session.user,
          uid: token.uid,
        },
      };
    },
  },
  providers: [GitHub],
  pages: {
    signIn: "/login",
  },
});
