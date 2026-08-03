import os

files_to_update = [
    "messages/en.json",
    "messages/vi.json",
    "emails/OtpEmail.tsx",
    "package.json",
    "README.md",
    "ENV_SETUP.md",
    "src/app/robots.ts",
    "src/app/sitemap.ts",
    "src/app/[locale]/pro/profile/page.tsx",
    "src/app/[locale]/(customer)/layout-client.tsx",
    "src/app/[locale]/layout.tsx",
    "src/app/[locale]/(public)/services/[slug]/page.tsx",
    "src/app/[locale]/(auth)/pro/register/page.tsx",
    "src/app/[locale]/(auth)/register/page.tsx",
    "src/app/[locale]/(auth)/login/page.tsx",
    "src/app/[locale]/(auth)/customer/register/page.tsx",
    "src/app/api/otp/send/route.ts",
    "src/components/booking/StepPayment.tsx",
    "src/components/booking/BookingConfirmation.tsx",
    "src/components/layout/Navbar.tsx",
    "src/components/layout/Footer.tsx",
    "src/lib/brevo.ts",
    "src/lib/nominatim.ts"
]

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Replace
        new_content = content.replace("Cue7Club", "MadClap").replace("cue7club", "madclap")
        
        if new_content != content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated {filepath}")
    else:
        print(f"Skipped {filepath} (Not Found)")
