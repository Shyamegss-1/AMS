import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CreadentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../lib/prisma";
import { User } from "./models/userModel";
import { compare } from "bcryptjs";

// connect to db

// custom page

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // OAuth authentication providers
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CreadentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email and password");
        }
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new CredentialsSignin("Invalid email or password");
        }

        if (!user.password) {
          throw new CredentialsSignin("Invalid email or password");
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
          throw new CredentialsSignin("Invalid email or password");
        }

        if (password !== "passcode")
          throw new CredentialsSignin({
            cause: "Password does not match",
          });
        else return { ...user, password: undefined };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
});
