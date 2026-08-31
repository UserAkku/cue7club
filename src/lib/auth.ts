import { cookies } from "next/headers";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  events: {
    async createUser({ user }) {
      const cookieStore = await cookies();
      const intendedRole = cookieStore.get("intended_role")?.value;
      if (intendedRole === "PROFESSIONAL" && user.id) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: "PROFESSIONAL" },
        });
        await prisma.professional.create({
          data: { userId: user.id }
        });
      }
    },
  },
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger, session }) {
      // First run the base jwt logic
      let finalToken = token;
      if (authConfig.callbacks?.jwt) {
        // @ts-ignore
        finalToken = await authConfig.callbacks.jwt({ token, user, trigger, session });
      }
      
      // If user is a professional and we don't have onboardingStatus yet, fetch it
      if (finalToken.role === "PROFESSIONAL" && !finalToken.onboardingStatus) {
        const pro = await prisma.professional.findUnique({
          where: { userId: finalToken.id as string }
        });
        if (pro) {
          finalToken.onboardingStatus = pro.onboardingStatus;
        } else {
          finalToken.onboardingStatus = "PENDING_PROFILE";
        }
      }
      
      return finalToken;
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "OTP",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
        intendedRole: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) return null;
        
        const email = credentials.email as string;
        const otp = credentials.otp as string;

        // Check OTP in database
        const otpRecord = await prisma.otpToken.findUnique({
          where: { email },
        });

        if (!otpRecord || otpRecord.token !== otp || otpRecord.expiresAt < new Date()) {
          return null;
        }

        // OTP is valid. Delete it so it can't be reused.
        await prisma.otpToken.delete({ where: { email } });

        // Find or create user
        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          const role = (credentials.intendedRole as string) === "PROFESSIONAL" ? "PROFESSIONAL" : "CUSTOMER";
          user = await prisma.user.create({
            data: { email, role, name: email.split("@")[0] },
          });
          if (role === "PROFESSIONAL") {
            await prisma.professional.create({
              data: { userId: user.id }
            });
          }
        }

        return user;
      },
    }),
  ],
});
