"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function updateJobStatus(jobId: string, newStatus: string) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "PROFESSIONAL") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const job = await prisma.booking.findUnique({
      where: { id: jobId }
    });

    if (!job) return { success: false, error: "Job not found" };

    await prisma.booking.update({
      where: { id: jobId },
      data: { status: newStatus }
    });

    await prisma.bookingTimeline.create({
      data: {
        bookingId: jobId,
        status: newStatus,
        note: `Status updated to ${newStatus} by professional`,
      }
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to update status" };
  }
}
