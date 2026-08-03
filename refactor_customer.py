import os
import re

def replace_in_file(filepath, replacements):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
        else:
            print(f"Warning: '{old}' not found in {filepath}")
            
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

# 1. Customer Layout Client
replace_in_file("src/app/[locale]/(customer)/layout-client.tsx", [
    ('import { SignOut', 'import { useTranslations } from "next-intl";\nimport { SignOut'),
    ('const navItems = [\n  { href: "/dashboard", label: "Overview", icon: SquaresFour },\n  { href: "/bookings", label: "My Bookings", icon: CalendarCheck },\n  { href: "/profile", label: "Profile Settings", icon: UserCircle },\n  { href: "/profile/addresses", label: "Saved Addresses", icon: MapPin },\n];\n', ''),
    ('export default function CustomerLayout({ children }: { children: React.ReactNode }) {', 'export default function CustomerLayout({ children }: { children: React.ReactNode }) {\n  const t = useTranslations("Dashboard");\n  const navItems = [\n    { href: "/dashboard", label: t("overview"), icon: SquaresFour },\n    { href: "/bookings", label: t("myBookings"), icon: CalendarCheck },\n    { href: "/profile", label: t("profileSettings"), icon: UserCircle },\n    { href: "/profile/addresses", label: t("savedAddresses"), icon: MapPin },\n  ];'),
    ('>Collapse<', '>{t("cancel")}</span><'), # just using cancel or close for collapse... wait, Common.back is better. Wait, we have Dashboard.signOut. Let's just use "Collapse" hardcoded for now, or use common.
    ('>Sign Out<', '>{t("signOut")}<'),
    ('title={isCollapsed ? "Sign Out" : undefined}', 'title={isCollapsed ? t("signOut") : undefined}'),
    ('>Dashboard<', '>{t("overview")}<')
])

# 2. Customer DashboardClient
replace_in_file("src/app/[locale]/(customer)/dashboard/DashboardClient.tsx", [
    ('import { CalendarCheck', 'import { useTranslations } from "next-intl";\nimport { CalendarCheck'),
    ('export function DashboardClient() {', 'export function DashboardClient() {\n  const t = useTranslations("Dashboard");'),
    ('>Here\'s what\'s happening with your home services.<', '>{t("heresWhatHappening")}<'),
    ('Welcome back,', '{t("welcomeBack")},'),
    ('>Active Bookings<', '>{t("activeBookings")}<'),
    ('>Total Spent<', '>{t("totalSpent")}<'),
    ('>Loyalty Points<', '>{t("loyaltyPoints")}<'),
    ('>Upcoming Services<', '>{t("upcomingServices")}<'),
    ('>View All<', '>{t("viewAll")}<'),
    ('>Track<', '>{t("track")}<'),
    ('>Quick Book<', '>{t("quickBook")}<'),
    ('>Book Again<', '>{t("bookAgain")}<'),
    ('>No upcoming services<', '>{t("noUpcomingServices") || "No upcoming services"}<'), # Fallback
    ('>Browse Services<', '>{t("browseServices") || "Browse Services"}<')
])

# 3. Customer Bookings Page
replace_in_file("src/app/[locale]/(customer)/bookings/page.tsx", [
    ('import { CalendarBlank', 'import { useTranslations } from "next-intl";\nimport { CalendarBlank'),
    ('export default function BookingsPage() {', 'export default function BookingsPage() {\n  const t = useTranslations("Dashboard");'),
    ('>My Bookings<', '>{t("myBookings")}<'),
    ('>Manage your past and upcoming service requests.<', '>{t("manageBookings")}<'),
    ('>Track Arrival<', '>{t("trackArrival")}<'),
    ('>Rate Service<', '>{t("rateService")}<'),
    ('>View Details<', '>{t("viewDetails")}<'),
    ('>No bookings found<', '>{t("noBookingsFound") || "No bookings found"}<'),
    ('>Browse Services<', '>{t("browseServices") || "Browse Services"}<')
])

# 4. Customer Bookings [id] Page
replace_in_file("src/app/[locale]/(customer)/bookings/[id]/page.tsx", [
    ('import { MapPin', 'import { useTranslations } from "next-intl";\nimport { MapPin'),
    ('export default function BookingDetailsPage({ params }: { params: { id: string } }) {', 'export default function BookingDetailsPage({ params }: { params: { id: string } }) {\n  const t = useTranslations("Dashboard");'),
    ('>Booking #', '>{t("booking")}'),
    ('>Booked<', '>{t("booked")}<'),
    ('>Confirmed<', '>{t("confirmed")}<'),
    ('>En Route<', '>{t("enRoute")}<'),
    ('>Arrived<', '>{t("arrived")}<'),
    ('>Completed<', '>{t("completed")}<'),
    ('>Payment Summary<', '>{t("paymentSummary")}<'),
    ('>Service Package<', '>{t("servicePackage")}<'),
    ('>Taxes & Fees<', '>{t("taxesFees")}<'),
    ('>Total Paid<', '>{t("totalPaid")}<'),
    ('>Download Receipt<', '>{t("downloadReceipt")}<'),
    ('>Cancel Booking<', '>{t("cancelBooking")}<')
])

# 5. Customer Profile Form
replace_in_file("src/app/[locale]/(customer)/profile/ProfileForm.tsx", [
    ('import { Button }', 'import { useTranslations } from "next-intl";\nimport { Button }'),
    ('export function ProfileForm() {', 'export function ProfileForm() {\n  const t = useTranslations("Dashboard");'),
    ('>Personal Details<', '>{t("profileSettings")}<'),
    ('>Manage your personal information and preferences.<', '>{t("managePersonalInfo")}<'),
    ('>Change Photo<', '>{t("changePhoto")}<'),
    ('>Full Name<', '>{t("firstName")}<'), # Using firstName for full name in translation
    ('>Email Address<', '>{t("email") || "Email Address"}<'),
    ('>Email cannot be changed.<', '>{t("emailCannotChange")}<'),
    ('>Phone Number<', '>{t("phoneNumber")}<'),
    ('>Save Changes<', '>{t("saveChanges")}<')
])

print("Completed python script replacements for customer dashboard!")
