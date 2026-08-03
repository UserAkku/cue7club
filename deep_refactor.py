import os
import re

def replace_in_file(filepath, replacements):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    original_content = content
    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content)
            
    if content != original_content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"No changes made to {filepath}")

# 1. Pro Layout Client
replace_in_file("src/app/[locale]/pro/layout-client.tsx", [
    (r'>Pro Partner<', '>{t("proPartner") || "Pro Partner"}<'),
    (r'>Sign Out<', '>{t("signOut")}<'),
    (r'>Pro Dashboard<', '>{t("proDashboard") || "Pro Dashboard"}<')
])

# 2. Pro Profile
replace_in_file("src/app/[locale]/pro/profile/page.tsx", [
    (r'>Edit Profile Details<', '>{t("editProfile") || "Edit Profile Details"}<')
])

# 3. Pro Earnings
replace_in_file("src/app/[locale]/pro/earnings/page.tsx", [
    (r'>Available Balance<', '>{t("availableBalance") || "Available Balance"}<'),
    (r'>Recent Transactions<', '>{t("recentTransactions") || "Recent Transactions"}<')
])

# 4. Pro Jobs [id]
replace_in_file("src/app/[locale]/pro/jobs/[id]/page.tsx", [
    (r'>Live Location Sharing Active<', '>{t("locationSharingActive") || "Live Location Sharing Active"}<'),
    (r'>Customer can track your arrival<', '>{t("customerTrackArrival") || "Customer can track your arrival"}<'),
    (r'>Job Completed<', '>{t("jobCompletedSuccess") || "Job Completed"}<')
])

# 5. Customer Profile
replace_in_file("src/app/[locale]/(customer)/profile/page.tsx", [
    (r'import \{ ProfileForm \}', 'import { useTranslations } from "next-intl";\nimport { ProfileForm }'),
    (r'export default function ProfilePage\(\) \{', 'export default function ProfilePage() {\n  const t = useTranslations("Dashboard");'),
    (r'>My Profile<', '>{t("profileSettings") || "My Profile"}<')
])

# 6. Customer Addresses
replace_in_file("src/app/[locale]/(customer)/profile/addresses/page.tsx", [
    (r'import \{ MapPin', 'import { useTranslations } from "next-intl";\nimport { MapPin'),
    (r'export default function AddressesPage\(\) \{', 'export default function AddressesPage() {\n  const t = useTranslations("Dashboard");'),
    (r'>Saved Addresses<', '>{t("savedAddresses") || "Saved Addresses"}<')
])

# 7. Customer Profile Form
replace_in_file("src/app/[locale]/(customer)/profile/ProfileForm.tsx", [
    (r'>Account Actions<', '>{t("accountActions") || "Account Actions"}<')
])

# 8. BookingFlow
replace_in_file("src/app/[locale]/(customer)/book/[slug]/BookingFlow.tsx", [
    (r'>Select a Package<', '>{t("selectPackage") || "Select a Package"}<'),
    (r'>Standard Service<', '>{t("standard") || "Standard Service"}<'),
    (r'>Select Date<', '>{t("date") || "Select Date"}<'),
    (r'>Select Time<', '>{t("time") || "Select Time"}<'),
    (r'>Review your Booking<', '>{t("reviewPay") || "Review your Booking"}<'),
    (r'>Service Total<', '>{t("serviceTotal") || "Service Total"}<'),
    (r'>Platform Fee<', '>{t("platformFee") || "Platform Fee"}<'),
    (r'>Amount to Pay<', '>{t("amountToPay") || "Amount to Pay"}<')
])

# 9. Services Page
replace_in_file("src/app/[locale]/(public)/services/page.tsx", [
    (r'import \{ Star \}', 'import { useTranslations } from "next-intl";\nimport { Star }'),
    (r'export default function ServicesPage\(\) \{', 'export default function ServicesPage() {\n  const t = useTranslations("Services");'),
    (r'>View Details<', '>{t("viewDetails")}<')
])

# 10. Service Detail Page
replace_in_file("src/app/[locale]/(public)/services/\[slug\]/page.tsx", [
    (r'import \{ Star', 'import { getTranslations } from "next-intl/server";\nimport { Star'),
    (r'export default async function ServiceDetailsPage\(\{ params \}: \{ params: \{ slug: string \} \}\) \{', 'export default async function ServiceDetailsPage({ params }: { params: { slug: string } }) {\n  const t = await getTranslations("Services");'),
    (r'>Starting price<', '>{t("startingPrice")}<'),
    (r'>Service Packages<', '>{t("servicePackages")}<'),
    (r'>Select Package<', '>{t("select")}<'),
    (r'>Verified Professionals<', '>{t("backgroundVerified")}<'),
    (r'>Transparent Pricing<', '>{t("transparentPricing")}<')
])

# 11. OTP Verify
replace_in_file("src/app/[locale]/(auth)/verify-otp/page.tsx", [
    (r'>Go back to Login<', '>{t("goBackToLogin") || "Go back to Login"}<'),
    (r'>Back to login<', '>{t("backToLogin") || "Back to login"}<')
])

# 12. Global Error
replace_in_file("src/app/[locale]/global-error.tsx", [
    (r'import \{ Inter \}', 'import { useTranslations } from "next-intl";\nimport { Inter }'),
    (r'export default function GlobalError\(\{\n  error,\n  reset,\n\}\: \{\n  error\: Error \& \{ digest\?\: string \}\;\n  reset\: \(\) \=\> void\;\n\}\) \{', 'export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {\n  const t = useTranslations("Common");'),
    (r'>Try again<', '>{t("retry") || "Try again"}<')
])

# 13. Step Address
replace_in_file("src/components/booking/StepAddress.tsx", [
    (r'>Pin your location<', '>{t("pinLocation")}<'),
    (r'>Service Address<', '>{t("serviceAddress")}<'),
    (r'>New Location<', '>{t("newLocation")}<'),
    (r'>Add new address via Map<', '>{t("addNewAddressMap")}<'),
    (r'>Continue to Payment<', '>{t("continueToPayment")}<')
])

# 14. Step Payment
replace_in_file("src/components/booking/StepPayment.tsx", [
    (r'>Order Summary<', '>{t("orderSummary")}<'),
    (r'>Total Amount<', '>{t("totalAmount")}<'),
    (r'>Secure Payment<', '>{t("securePayment")}<')
])

# 15. Step Date Time
replace_in_file("src/components/booking/StepDateTime.tsx", [
    (r'>Continue to Address<', '>{t("continueToAddress")}<')
])

# 16. Booking Confirmation
replace_in_file("src/components/booking/BookingConfirmation.tsx", [
    (r'>Go to Dashboard<', '>{t("goToDashboard")}<'),
    (r'>Return Home<', '>{t("returnHome")}<')
])
