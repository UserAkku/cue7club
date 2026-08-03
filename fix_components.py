import os
import re

def fix_component(filepath, func_name):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # regex to find the function signature and append `const t = ...` right after it
    pattern = r'(export function ' + func_name + r'\([^)]*\)\s*\{)'
    replacement = r'\1\n  const t = useTranslations("Booking");'
    
    new_content = re.sub(pattern, replacement, content)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"Fixed {filepath}")

fix_component("src/components/booking/StepAddress.tsx", "StepAddress")
fix_component("src/components/booking/StepDateTime.tsx", "StepDateTime")
fix_component("src/components/booking/StepPayment.tsx", "StepPayment")
