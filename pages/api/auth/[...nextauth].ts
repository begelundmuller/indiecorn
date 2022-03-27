import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import { Provider } from "next-auth/providers";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

import prisma from "lib/prisma";

const providers: Provider[] = [];

if (process.env.GOOGLE_CLIENT_ID) {
  providers.push(GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }));
}

if (process.env.EMAIL_SERVER_HOST) {
  providers.push(EmailProvider({
    from: process.env.EMAIL_FROM,
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
  }));
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, {
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  providers,
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    // Adds extra properties to the session object
    async session({ session, token, user }) {
      // Note: Session properties must also be declared in types/next-auth.d.ts
      session.user.id = user.id;
      return session;
    }
  }
});

export default authHandler;
