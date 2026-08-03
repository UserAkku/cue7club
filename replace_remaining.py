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

# Pro Schedule
replace_in_file("src/app/[locale]/pro/schedule/page.tsx", [
    (r'>Manage your availability and upcoming appointments\.<', '>{t("manageAvailability")}<'),
    (r'>Status:<', '>{t("statusLabel")}<'),
    (r'>Today<', '>{t("today")}<')
])

# Pro Dashboard Client
replace_in_file("src/app/[locale]/pro/dashboard/DashboardClient.tsx", [
    (r'>View All Jobs →<', '>{t("viewAllJobs")}<'),
    (r'>Upcoming<', '>{t("upcoming")}<'),
    (r'>Completed<', '>{t("completedLabel")}<'),
    # Note: "Full Home Deep Cleaning" and "Sofa Cleaning" and mock times are hardcoded mock data, usually translating mock data is optional but let's replace it with a string for robustness
    (r'>Full Home Deep Cleaning<', '>{t("fullDeepCleaning") || "Full Home Deep Cleaning"}<'),
    (r'>Sofa Cleaning<', '>{t("sofaCleaning") || "Sofa Cleaning"}<')
])

# Pro Profile
replace_in_file("src/app/[locale]/pro/profile/page.tsx", [
    (r'>Manage your personal details and service areas\.<', '>{t("managePersonalDetails")}<')
])

# Pro Earnings
replace_in_file("src/app/[locale]/pro/earnings/page.tsx", [
    (r'>Track your payouts, balances, and history\.<', '>{t("trackPayouts")}<'),
    (r'>Ready to be withdrawn to your bank account\.<', '>{t("readyToWithdraw")}<'),
    (r'>Total Earnings \(This Month\)<', '>{t("totalEarningsMonth")}<'),
    (r'>You are doing great this month!<', '>{t("doingGreat")}<')
])

# Pro Jobs ID
replace_in_file("src/app/[locale]/pro/jobs/[id]/page.tsx", [
    (r'>Full Home Deep Cleaning<', '>{t("fullDeepCleaning") || "Full Home Deep Cleaning"}<'),
    (r'>Great work!<', '>{t("greatWork")}<'),
    (r'>Online \(Pre-paid\)<', '>{t("onlinePrepaid")}<')
])

# Pro Jobs
replace_in_file("src/app/[locale]/pro/jobs/page.tsx", [
    (r'>Manage your upcoming and past service requests\.<', '>{t("manageServiceRequests")}<')
])

# Customer Bookings Page
replace_in_file("src/app/[locale]/(customer)/bookings/page.tsx", [
    (r">You haven't booked any services yet\.<", '>{t("noBookingsYet")}<')
])

# Customer Dashboard
replace_in_file("src/app/[locale]/(customer)/dashboard/DashboardClient.tsx", [
    (r">You don't have any active bookings right now\.<", '>{t("noActiveBookings")}<')
])

# Customer Profile Form
replace_in_file("src/app/[locale]/(customer)/profile/ProfileForm.tsx", [
    (r'>Sign out of your account on this device\.<', '>{t("signOutDevice")}<')
])

# Customer Addresses Page
replace_in_file("src/app/[locale]/(customer)/profile/addresses/page.tsx", [
    (r'>Manage locations for your service bookings\.<', '>{t("manageLocations")}<'),
    (r'>Default<', '>{t("defaultLabel")}<'),
    (r'>Edit<', '>{t("editBtn")}<')
])

# Customer Profile Page
replace_in_file("src/app/[locale]/(customer)/profile/page.tsx", [
    (r'>Manage your personal information and preferences\.<', '>{t("manageInfo")}<')
])

# Booking Flow
replace_in_file("src/app/[locale]/(customer)/book/[slug]/BookingFlow.tsx", [
    (r'>When do you need it\?<', '>{t("whenDoYouNeedIt")}<'),
    (r'>Where do we go\?<', '>{t("whereDoWeGo")}<'),
    (r'>House / Flat / Block No\.<', '>{t("houseFlatBlock")}<'),
    (r'>City<', '>{t("city")}<'),
    (r'>Pincode<', '>{t("pincode")}<'),
    (r'>State<', '>{t("state")}<'),
    (r'>Back<', '>{t("backBtn")}<')
])
