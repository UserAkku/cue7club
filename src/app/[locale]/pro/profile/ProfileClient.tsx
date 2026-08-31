"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { User, Phone, EnvelopeSimple, MapPin, Star, SignOut } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function ProfileClient({ professional }: { professional: any }) {
  const t = useTranslations("ProDashboard");
  
  return (
    <div className="pb-12 max-w-3xl mx-auto">
      <div className="mb-10">
        <h1 className="font-heading text-4xl font-bold tracking-tight mb-2">{t("proProfile") || "Professional Profile"}</h1>
        <p className="text-muted-foreground">{t("managePersonalDetails") || "Manage your personal details"}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6"
      >
        <Card className="p-8 border-black/5 bg-white shadow-sm rounded-3xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 relative">
              <div className="h-32 w-32 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center text-primary text-4xl font-heading font-bold border-4 border-white shadow-md">
                {professional.user.image ? (
                  <img src={professional.user.image} alt={professional.user.name} className="w-full h-full object-cover" />
                ) : (
                  professional.user.name?.charAt(0) || "P"
                )}
              </div>
              <div className="absolute bottom-0 right-0 bg-warning text-white rounded-full p-1.5 shadow-md flex items-center gap-1 px-3 border-2 border-white">
                <Star size={16} weight="fill" />
                <span className="text-xs font-bold">{professional.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="flex-1 w-full space-y-6">
              <div>
                <h2 className="font-heading text-2xl font-bold">{professional.user.name}</h2>
                <p className="text-primary font-medium">{professional.bio || "Professional"}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <EnvelopeSimple size={16} /> Email
                  </div>
                  <p className="font-medium">{professional.user.email}</p>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Phone size={16} /> Phone
                  </div>
                  <p className="font-medium">{professional.user.phone || "Not provided"}</p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <MapPin size={16} /> Service Area
                  </div>
                  <p className="font-medium">
                    {professional.serviceAreas?.length > 0 
                      ? professional.serviceAreas.map((s: any) => `${s.city} (${s.pincode})`).join(", ")
                      : "Not set"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-black/5 flex justify-end">
            <Button variant="outline" className="rounded-full px-6">{t("editProfile") || "Edit Profile Details"}</Button>
          </div>
        </Card>

        <Card className="p-8 border-black/5 bg-white shadow-sm rounded-3xl">
          <h3 className="font-heading text-xl font-bold mb-4 text-danger flex items-center gap-2">
            <SignOut size={24} /> Account Settings
          </h3>
          <p className="text-muted-foreground mb-6">
            Sign out of your professional account. You will need to log back in to accept new jobs.
          </p>
          <Button 
            variant="destructive" 
            className="rounded-full px-8 shadow-sm"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out Securely
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
