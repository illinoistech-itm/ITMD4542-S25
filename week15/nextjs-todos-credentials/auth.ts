import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
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
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "********",
        },
      },
      authorize: async (credentials) => {
        let user = null;

        // Perform your own authentication logic here
        const username = credentials?.email;
        const password = credentials?.password;

        if (username === "bbailey4@iit.edu" && password === "password") {
          user = {
            id: "1",
            name: "Brian Bailey",
            email: "bbailey4@iit.edu",
          };
          return user;
        }

        return user;
      },
    }),
  ],
  pages: {
    // signIn: "/login",
  },
});
