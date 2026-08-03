import os
import re

def insert_after(filepath, search_str, insert_str):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    if insert_str not in content:
        content = content.replace(search_str, search_str + "\n" + insert_str)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {filepath}")

# 1. verify-otp
insert_after("src/app/[locale]/(auth)/verify-otp/page.tsx",
             'import { Suspense } from "react";',
             'import { useTranslations } from "next-intl";')
insert_after("src/app/[locale]/(auth)/verify-otp/page.tsx",
             'export default function VerifyOtpPage() {',
             '  const t = useTranslations("Auth");')

# 2. BookingFlow
insert_after("src/app/[locale]/(customer)/book/[slug]/BookingFlow.tsx",
             'import { useState } from "react";',
             'import { useTranslations } from "next-intl";')
insert_after("src/app/[locale]/(customer)/book/[slug]/BookingFlow.tsx",
             'export function BookingFlow({ service }: { service: any }) {',
             '  const t = useTranslations("Booking");')

# 3. profile/page
insert_after("src/app/[locale]/(customer)/profile/page.tsx",
             'export default function ProfilePage() {',
             '  const t = useTranslations("Dashboard");')

# 4. global-error
insert_after("src/app/[locale]/global-error.tsx",
             'import { useTranslations } from "next-intl";',
             '') # Already added import, just need to make sure t is used correctly
             
# 5. BookingConfirmation
insert_after("src/components/booking/BookingConfirmation.tsx",
             'import { Button } from "@/components/ui/Button";',
             'import { useTranslations } from "next-intl";')
insert_after("src/components/booking/BookingConfirmation.tsx",
             'export function BookingConfirmation() {',
             '  const t = useTranslations("Booking");')

# 6. StepAddress
insert_after("src/components/booking/StepAddress.tsx",
             'import { MapPin, Plus } from "@phosphor-icons/react";',
             'import { useTranslations } from "next-intl";')
insert_after("src/components/booking/StepAddress.tsx",
             'export function StepAddress({ onNext }: { onNext: () => void }) {',
             '  const t = useTranslations("Booking");')

# 7. StepDateTime
insert_after("src/components/booking/StepDateTime.tsx",
             'import { Calendar as CalendarIcon, Clock } from "@phosphor-icons/react";',
             'import { useTranslations } from "next-intl";')
insert_after("src/components/booking/StepDateTime.tsx",
             'export function StepDateTime({ onNext }: { onNext: () => void }) {',
             '  const t = useTranslations("Booking");')

# 8. StepPayment
insert_after("src/components/booking/StepPayment.tsx",
             'import { ShieldCheck, CreditCard } from "@phosphor-icons/react";',
             'import { useTranslations } from "next-intl";')
insert_after("src/components/booking/StepPayment.tsx",
             'export function StepPayment({ onComplete }: { onComplete: () => void }) {',
             '  const t = useTranslations("Booking");')

# 9. services/[slug]/page
insert_after("src/app/[locale]/(public)/services/[slug]/page.tsx",
             'import { Star',
             'import { getTranslations } from "next-intl/server";')
insert_after("src/app/[locale]/(public)/services/[slug]/page.tsx",
             'export default async function ServiceDetailsPage({ params }: { params: { slug: string } }) {',
             '  const t = await getTranslations("Services");')
             
# services/[slug]/page replacements that were skipped
with open("src/app/[locale]/(public)/services/[slug]/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()
content = re.sub(r'>Starting price<', '>{t("startingPrice")}<', content)
content = re.sub(r'>Service Packages<', '>{t("servicePackages")}<', content)
content = re.sub(r'>Select Package<', '>{t("select")}<', content)
content = re.sub(r'>Verified Professionals<', '>{t("backgroundVerified")}<', content)
content = re.sub(r'>Transparent Pricing<', '>{t("transparentPricing")}<', content)
with open("src/app/[locale]/(public)/services/[slug]/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Updated services/[slug]/page.tsx")
