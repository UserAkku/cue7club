"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function completeOnboardingStep(step: number, data: any) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "PROFESSIONAL") {
    throw new Error("Unauthorized");
  }

  // Handle data updates step by step
  if (step === 1) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: data.name, phone: data.phone }
    });
    await prisma.professional.update({
      where: { userId: session.user.id },
      data: { bio: data.bio }
    });
  }

  // Assuming full flow completes in step 5
  if (step === 5) {
    await prisma.professional.update({
      where: { userId: session.user.id },
      data: { onboardingStatus: "PENDING_APPROVAL" }
    });
  }
}

export async function approveProfessional(professionalId: string) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  await prisma.professional.update({
    where: { id: professionalId },
    data: { onboardingStatus: "ACTIVE", rejectionReason: null }
  });
  
  revalidatePath("/admin/professionals");
}

export async function rejectProfessional(professionalId: string, reason: string) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  await prisma.professional.update({
    where: { id: professionalId },
    data: { onboardingStatus: "REJECTED", rejectionReason: reason }
  });
  
  revalidatePath("/admin/professionals");
}

export async function suspendProfessional(professionalId: string) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  await prisma.professional.update({
    where: { id: professionalId },
    data: { onboardingStatus: "SUSPENDED" }
  });
  
  revalidatePath("/admin/professionals");
}

export async function reactivateProfessional(professionalId: string) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  await prisma.professional.update({
    where: { id: professionalId },
    data: { onboardingStatus: "ACTIVE" }
  });
  
  revalidatePath("/admin/professionals");
}
