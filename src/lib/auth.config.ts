import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.onboardingStatus = (user as any).onboardingStatus;
      }
      
      // Allow session update for onboarding status
      if (trigger === "update" && session?.onboardingStatus) {
        token.onboardingStatus = session.onboardingStatus;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
        (session.user as any).onboardingStatus = token.onboardingStatus as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
