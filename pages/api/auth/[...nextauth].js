import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      //データベースのユーザーのidをsession.user.idにも代入する
      session.user.id = user.id;
      return Promise.resolve(session);
    },
  },
  logger: {
    error(code, metadata) {
      log.error(code, metadata);
    },
    warn(code) {
      log.warn(code);
    },
    debug(code, metadata) {
      log.debug(code, metadata);
    },
  },
  secret: process.env.SECRET,
});
