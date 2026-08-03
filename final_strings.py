import json
import os
import re

# 1. Update JSONs
with open('messages/en.json', 'r', encoding='utf-8') as f:
    en = json.load(f)
with open('messages/vi.json', 'r', encoding='utf-8') as f:
    vi = json.load(f)

new_keys = {
    "Services": {
        "en": {
            "whatsIncluded": "What's Included",
            "standardPkg": "Standard",
            "standardDesc": "Perfect for regular home maintenance and upkeep.",
            "popularBadge": "POPULAR",
            "premiumPkg": "Premium",
            "premiumDesc": "Includes advanced sanitization.",
            "whyChooseUs": "Why choose MadClap?",
            "strictBackground": "Strict background checks on all staff.",
            "noHiddenFees": "No hidden fees or surprise charges.",
            "realTimeTracking": "Real-time Tracking",
            "trackLive": "Track your professional's arrival live.",
            "reviewsCount": "124 reviews",
            "thirtyDayGuarantee": "30-Day Guarantee"
        },
        "vi": {
            "whatsIncluded": "Những gì bao gồm",
            "standardPkg": "Tiêu chuẩn",
            "standardDesc": "Hoàn hảo cho việc bảo trì và dọn dẹp nhà cửa thường xuyên.",
            "popularBadge": "PHỔ BIẾN",
            "premiumPkg": "Cao cấp",
            "premiumDesc": "Bao gồm khử trùng nâng cao.",
            "whyChooseUs": "Tại sao chọn MadClap?",
            "strictBackground": "Kiểm tra lý lịch nghiêm ngặt đối với tất cả nhân viên.",
            "noHiddenFees": "Không có phí ẩn hoặc phí bất ngờ.",
            "realTimeTracking": "Theo dõi thời gian thực",
            "trackLive": "Theo dõi sự xuất hiện của chuyên gia trực tiếp.",
            "reviewsCount": "124 đánh giá",
            "thirtyDayGuarantee": "Bảo hành 30 ngày"
        }
    },
    "Auth": {
        "en": {
            "invalidRequest": "Invalid request.",
            "loading": "Loading...",
            "needService": "I need a service",
            "amProfessional": "I'm a professional"
        },
        "vi": {
            "invalidRequest": "Yêu cầu không hợp lệ.",
            "loading": "Đang tải...",
            "needService": "Tôi cần một dịch vụ",
            "amProfessional": "Tôi là một chuyên gia"
        }
    },
    "Booking": {
        "en": {
            "cancel": "Cancel",
            "backBtn": "Back",
            "reviewAndPay": "Review & Pay",
            "packageLabel": "Package",
            "dateLabel": "Date",
            "timeLabel": "Time",
            "secureRazorpay": "Your payment is processed securely via Razorpay. We do not store card details.",
            "selectDateTime": "Select Date & Time"
        },
        "vi": {
            "cancel": "Hủy bỏ",
            "backBtn": "Quay lại",
            "reviewAndPay": "Xem lại và thanh toán",
            "packageLabel": "Gói",
            "dateLabel": "Ngày",
            "timeLabel": "Thời gian",
            "secureRazorpay": "Thanh toán của bạn được xử lý an toàn qua Razorpay. Chúng tôi không lưu trữ thông tin thẻ.",
            "selectDateTime": "Chọn ngày và giờ"
        }
    },
    "Common": {
        "en": {
            "collapse": "Collapse"
        },
        "vi": {
            "collapse": "Thu gọn"
        }
    },
    "ProDashboard": {
        "en": {
            "selectDate": "Select Date"
        },
        "vi": {
            "selectDate": "Chọn ngày"
        }
    }
}

for ns, langs in new_keys.items():
    if ns not in en: en[ns] = {}
    if ns not in vi: vi[ns] = {}
    for k, v in langs["en"].items():
        if k not in en[ns]: en[ns][k] = v
    for k, v in langs["vi"].items():
        if k not in vi[ns]: vi[ns][k] = v

with open('messages/en.json', 'w', encoding='utf-8') as f:
    json.dump(en, f, indent=2, ensure_ascii=False)
with open('messages/vi.json', 'w', encoding='utf-8') as f:
    json.dump(vi, f, indent=2, ensure_ascii=False)

# 2. File replacements
def replace_in_file(filepath, replacements):
    if not os.path.exists(filepath): return
    with open(filepath, "r", encoding="utf-8") as f: content = f.read()
    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content)
    with open(filepath, "w", encoding="utf-8") as f: f.write(content)

replace_in_file("src/app/[locale]/(public)/services/[slug]/page.tsx", [
    (r">30-Day Guarantee<", '>{t("thirtyDayGuarantee")}<'),
    (r">What's Included<", '>{t("whatsIncluded")}<'),
    (r">Standard<", '>{t("standardPkg")}<'),
    (r">Perfect for regular home maintenance and upkeep\.<", '>{t("standardDesc")}<'),
    (r">POPULAR<", '>{t("popularBadge")}<'),
    (r">Premium<", '>{t("premiumPkg")}<'),
    (r">Includes advanced sanitization\.<", '>{t("premiumDesc")}<'),
    (r">Why choose MadClap\?<", '>{t("whyChooseUs")}<'),
    (r">Strict background checks on all staff\.<", '>{t("strictBackground")}<'),
    (r">No hidden fees or surprise charges\.<", '>{t("noHiddenFees")}<'),
    (r">Real-time Tracking<", '>{t("realTimeTracking")}<'),
    (r">Track your professional's arrival live\.<", '>{t("trackLive")}<')
])

replace_in_file("src/app/[locale]/(public)/services/page.tsx", [
    (r">124 reviews<", '>{t("reviewsCount")}<')
])

replace_in_file("src/app/[locale]/(auth)/verify-otp/page.tsx", [
    (r">Invalid request\.<", '>{t("invalidRequest")}<'),
    (r">Loading\.\.\.<", '>{t("loading")}<')
])

replace_in_file("src/app/[locale]/(auth)/register/page.tsx", [
    (r"import \{ Link \} from", 'import { useTranslations } from "next-intl";\nimport { Link } from'),
    (r"export default function RegisterTypePage\(\) \{", 'export default function RegisterTypePage() {\n  const t = useTranslations("Auth");'),
    (r">I need a service<", '>{t("needService")}<'),
    (r">I'm a professional<", '>{t("amProfessional")}<')
])

replace_in_file("src/components/booking/StepAddress.tsx", [
    (r">Cancel<", '>{t("cancel")}<'),
    (r">Back<", '>{t("backBtn")}<')
])

replace_in_file("src/components/booking/StepPayment.tsx", [
    (r">Review & Pay<", '>{t("reviewAndPay")}<'),
    (r">Package<", '>{t("packageLabel")}<'),
    (r">Date<", '>{t("dateLabel")}<'),
    (r">Time<", '>{t("timeLabel")}<'),
    (r">Your payment is processed securely via Razorpay\. We do not store card details\.<", '>{t("secureRazorpay")}<')
])

replace_in_file("src/components/booking/StepDateTime.tsx", [
    (r">Select Date & Time<", '>{t("selectDateTime")}<'),
    (r">Date<", '>{t("dateLabel")}<'),
    (r">Time<", '>{t("timeLabel")}<')
])

replace_in_file("src/app/[locale]/pro/layout-client.tsx", [
    (r">Collapse<", '>{t("collapse") || "Collapse"}<') # Already uses useTranslations("Common") Wait, does it?
])
replace_in_file("src/app/[locale]/pro/schedule/page.tsx", [
    (r">Select Date<", '>{t("selectDate") || "Select Date"}<')
])

print("Finished final replacements")
