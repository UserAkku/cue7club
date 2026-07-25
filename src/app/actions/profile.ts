"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;

    if (!name || name.trim() === "") {
      return { success: false, error: "Name is required." };
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        phone: phone || null,
      },
    });

    revalidatePath("/[locale]/(customer)/profile", "page");
    revalidatePath("/[locale]/(customer)/dashboard", "page");

    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error: "An error occurred while updating the profile." };
  }
}
