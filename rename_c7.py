import os

files_to_update = [
    "src/app/[locale]/pro/layout-client.tsx",
    "src/app/[locale]/(customer)/layout-client.tsx",
    "src/app/[locale]/(auth)/pro/register/page.tsx",
    "src/app/[locale]/(auth)/register/page.tsx",
    "src/app/[locale]/(auth)/login/page.tsx",
    "src/app/[locale]/(auth)/customer/register/page.tsx",
    "src/components/layout/Navbar.tsx",
    "src/components/layout/Footer.tsx"
]

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Replace only the C7 text node, using precise replace to avoid replacing classNames or logic if any
        new_content = content.replace(">C7<", ">MC<").replace(" C7\n", " MC\n").replace("              C7", "              MC").replace("          C7", "          MC").replace("            C7", "            MC").replace("                C7", "                MC")
        
        if new_content != content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated {filepath}")
    else:
        print(f"Skipped {filepath} (Not Found)")
