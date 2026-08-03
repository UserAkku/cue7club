"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/Card";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { User, Phone, EnvelopeSimple, SignOut } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { signOut } from "next-auth/react";
import { updateProfile } from "@/app/actions/profile";

type UserData = {
  name: string;
  email: string;
  phone: string | null;
  role: string;
};

export default function ProfileForm({ user }: { user: UserData }) {
  const t = useTranslations("Dashboard");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setMessage(null);
    startTransition(async () => {
      const res = await updateProfile(formData);
      if (res.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        setMessage({ type: "error", text: res.error || "Failed to update profile." });
      }
    });
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="space-y-8">
      {/* Account Info Card */}
      <Card className="p-8 border-black/5 bg-white shadow-sm rounded-3xl">
        <h2 className="font-heading text-2xl font-bold tracking-tight mb-6">{t("profileSettings")}</h2>
        
        <form action={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-muted-foreground ml-1">{t("firstName")}</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} weight="duotone" />
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  defaultValue={user.name} 
                  required
                  className="w-full h-12 pl-12 pr-4 bg-secondary/50 border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-muted-foreground ml-1">{t("email") || "Email Address"}</label>
              <div className="relative">
                <EnvelopeSimple className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} weight="duotone" />
                <input 
                  type="email" 
                  id="email" 
                  defaultValue={user.email} 
                  disabled
                  className="w-full h-12 pl-12 pr-4 bg-secondary/30 border border-black/5 rounded-2xl text-muted-foreground font-medium cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="phone" className="text-sm font-semibold text-muted-foreground ml-1">{t("phoneNumber")}</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} weight="duotone" />
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  defaultValue={user.phone || ""} 
                  placeholder="e.g., +91 9876543210"
                  className="w-full h-12 pl-12 pr-4 bg-secondary/50 border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
              </div>
            </div>

          </div>
          
          {message && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl text-sm font-medium ${message.type === "success" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}
            >
              {message.text}
            </motion.div>
          )}

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={isPending} className="h-12 px-8 font-semibold rounded-2xl shadow-sm">
              {isPending ? "Saving..." : t("saveChanges")}
            </Button>
          </div>
        </form>
      </Card>

      {/* Danger Zone */}
      <Card className="p-8 border-destructive/20 bg-destructive/5 shadow-sm rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-xl font-bold tracking-tight text-destructive mb-1">Account Actions</h3>
            <p className="text-sm text-muted-foreground">Sign out of your account on this device.</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSignOut} 
            className="h-12 border-destructive/30 text-destructive hover:bg-destructive hover:text-white rounded-2xl font-semibold shadow-sm w-full sm:w-auto transition-colors"
          >
            <SignOut size={20} className="mr-2" weight="bold" /> {t("signOut")}
          </Button>
        </div>
      </Card>
    </div>
  );
}
