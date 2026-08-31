import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getTranslations } from "next-intl/server";

export default async function AdminBookingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect(`/${resolvedParams.locale}/login`);
  }

  const t = await getTranslations("Admin");
  
  const bookings = await prisma.booking.findMany({
    include: {
      customer: true,
      professional: { include: { user: true } },
      service: true,
      address: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">All Bookings</h1>
          <p className="text-muted-foreground mt-2">Monitor platform-wide bookings.</p>
        </div>
      </div>

      <Card className="border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-white/5 text-muted-foreground border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">Booking ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Professional</th>
                <th className="px-6 py-4 font-medium">Service</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{booking.bookingNumber}</td>
                  <td className="px-6 py-4 text-muted-foreground">{booking.customer?.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{booking.professional?.user?.name || "Unassigned"}</td>
                  <td className="px-6 py-4 text-muted-foreground">{booking.service?.name}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      booking.status === "COMPLETED" ? "success" : 
                      booking.status === "CANCELLED" ? "destructive" : "default"
                    }>
                      {booking.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-foreground font-bold">₹{booking.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
