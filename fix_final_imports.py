import os

def insert_import(filepath, search_str, insert_str):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    if insert_str not in content:
        content = content.replace(search_str, search_str + "\n" + insert_str)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)

insert_import("src/app/[locale]/(public)/services/[slug]/page.tsx",
              'import { notFound } from "next/navigation";',
              'import { getTranslations } from "next-intl/server";')

insert_import("src/components/booking/StepDateTime.tsx",
              'import { Button } from "@/components/ui/Button";',
              'import { useTranslations } from "next-intl";')

insert_import("src/components/booking/StepPayment.tsx",
              'import { Button } from "@/components/ui/Button";',
              'import { useTranslations } from "next-intl";')
