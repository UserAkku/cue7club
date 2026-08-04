import json
import os
import re

# 1. Update JSONs
with open('messages/en.json', 'r', encoding='utf-8') as f:
    en = json.load(f)
with open('messages/vi.json', 'r', encoding='utf-8') as f:
    vi = json.load(f)

additions = {
    "Services": {
        "en": {
            "premiumServicesTitle": "Premium Services",
            "browseCatalog": "Browse our catalog of verified, top-tier professional services.",
            "filter_All": "All",
            "filter_Cleaning": "Cleaning",
            "filter_Garden": "Garden",
            "filter_Pool": "Pool",
            "filter_Health": "Health",
            "cleaning": "Cleaning",
            "garden": "Garden",
            "pool": "Pool",
            "health": "Health",
            "deep-cleaning": "Full Home Deep Cleaning",
            "sofa-cleaning": "Sofa & Upholstery Cleaning",
            "garden-setup": "Balcony Garden Setup",
            "pool-maintenance": "Monthly Pool Maintenance",
            "physio-home": "At-Home Physiotherapy",
            "fromPrice": "From ₹{price}",
            "viewDetails": "View Details",
            "premiumCategoryService": "Premium {category} Service",
            "serviceDesc": "Expert professionals delivering top-tier service. Guaranteed satisfaction or we redo it for free.",
            "takesMins": "Takes ~{duration} mins",
            "thirtyDayGuarantee": "30-Day Guarantee",
            "startingPrice": "Starting Price",
            "bookNow": "Book Now"
        },
        "vi": {
            "premiumServicesTitle": "Dịch vụ Cao cấp",
            "browseCatalog": "Duyệt qua danh mục các dịch vụ chuyên nghiệp, chất lượng cao đã được xác minh.",
            "filter_All": "Tất cả",
            "filter_Cleaning": "Làm sạch",
            "filter_Garden": "Vườn",
            "filter_Pool": "Hồ bơi",
            "filter_Health": "Sức khỏe",
            "cleaning": "Làm sạch",
            "garden": "Vườn",
            "pool": "Hồ bơi",
            "health": "Sức khỏe",
            "deep-cleaning": "Dọn dẹp nhà cửa toàn diện",
            "sofa-cleaning": "Vệ sinh sofa & bọc ghế",
            "garden-setup": "Thiết lập vườn ban công",
            "pool-maintenance": "Bảo trì hồ bơi hàng tháng",
            "physio-home": "Vật lý trị liệu tại nhà",
            "fromPrice": "Từ ₹{price}",
            "viewDetails": "Xem chi tiết",
            "premiumCategoryService": "Dịch vụ {category} Cao cấp",
            "serviceDesc": "Các chuyên gia cung cấp dịch vụ hàng đầu. Đảm bảo sự hài lòng hoặc chúng tôi sẽ làm lại miễn phí.",
            "takesMins": "Mất ~{duration} phút",
            "thirtyDayGuarantee": "Bảo hành 30 ngày",
            "startingPrice": "Giá khởi điểm",
            "bookNow": "Đặt Ngay"
        }
    }
}

for ns, langs in additions.items():
    if ns not in en: en[ns] = {}
    if ns not in vi: vi[ns] = {}
    for k, v in langs["en"].items():
        en[ns][k] = v
    for k, v in langs["vi"].items():
        vi[ns][k] = v

with open('messages/en.json', 'w', encoding='utf-8') as f:
    json.dump(en, f, indent=2, ensure_ascii=False)
with open('messages/vi.json', 'w', encoding='utf-8') as f:
    json.dump(vi, f, indent=2, ensure_ascii=False)

def replace_in_file(filepath, replacements):
    if not os.path.exists(filepath): return
    with open(filepath, "r", encoding="utf-8") as f: content = f.read()
    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content)
    with open(filepath, "w", encoding="utf-8") as f: f.write(content)

# File 1: services/page.tsx
replace_in_file("src/app/[locale]/(public)/services/page.tsx", [
    (r'getTranslations\("Navigation"\)', 'getTranslations("Services")'),
    (r'>\s*Premium Services\s*<', '>{t("premiumServicesTitle")}<'),
    (r'>\s*Browse our catalog of verified, top-tier professional services\.\s*<', '>{t("browseCatalog")}<'),
    (r'>\s*\{cat\}\s*<', '>{t(`filter_${cat}` as any)}<'),
    (r'\{service\.category\.name\}', '{t(service.category.slug as any)}'),
    (r'\{service\.name\}', '{t(service.slug as any)}'),
    (r'>\s*From ₹\{service\.basePrice\}\s*<', '>{t("fromPrice", { price: service.basePrice })}<'),
    (r'\{t\("viewDetails"\)\}', '{t("viewDetails")}'), # ensure it's there
    (r'\{t\("reviewsCount"\)\}', '{t("reviewsCount")}') # ensure it's there
])

# File 2: services/[slug]/page.tsx
replace_in_file("src/app/[locale]/(public)/services/[slug]/page.tsx", [
    (r'>\s*Premium \{service\.category\.name\} Service\s*<', '>{t("premiumCategoryService", { category: t(service.category.slug as any) })}<'),
    (r'>\s*\{service\.name\}\s*<', '>{t(service.slug as any)}<'),
    (r'>\s*\{service\.description\}\s*<', '>{t("serviceDesc")}<'),
    (r'>\s*Takes ~\{service\.duration\} mins\s*<', '>{t("takesMins", { duration: service.duration })}<'),
    (r'>\s*30-Day Guarantee\s*<', '>{t("thirtyDayGuarantee")}<'),
    (r'>\s*\{t\("thirtyDayGuarantee"\)\}\s*<', '>{t("thirtyDayGuarantee")}<'),
    (r'\{t\("startingPrice"\)\}', '{t("startingPrice")}'), # Ensure it's there
    (r'>\s*Book Now\s*<', '>{t("bookNow")}<')
])

print("Fixed final DB content issues.")
