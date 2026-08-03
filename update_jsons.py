import json

# 1. Load JSONs
with open('messages/en.json', 'r', encoding='utf-8') as f:
    en = json.load(f)
with open('messages/vi.json', 'r', encoding='utf-8') as f:
    vi = json.load(f)

# 2. Define additions
additions = {
    "ProDashboard": {
        "en": {
            "manageAvailability": "Manage your availability and upcoming appointments.",
            "statusLabel": "Status:",
            "today": "Today",
            "viewAllJobs": "View All Jobs →",
            "upcoming": "Upcoming",
            "completedLabel": "Completed",
            "managePersonalDetails": "Manage your personal details and service areas.",
            "trackPayouts": "Track your payouts, balances, and history.",
            "readyToWithdraw": "Ready to be withdrawn to your bank account.",
            "totalEarningsMonth": "Total Earnings (This Month)",
            "doingGreat": "You are doing great this month!",
            "greatWork": "Great work!",
            "onlinePrepaid": "Online (Pre-paid)",
            "manageServiceRequests": "Manage your upcoming and past service requests."
        },
        "vi": {
            "manageAvailability": "Quản lý sự sẵn sàng và các cuộc hẹn sắp tới của bạn.",
            "statusLabel": "Trạng thái:",
            "today": "Hôm nay",
            "viewAllJobs": "Xem tất cả công việc →",
            "upcoming": "Sắp tới",
            "completedLabel": "Đã hoàn thành",
            "managePersonalDetails": "Quản lý thông tin cá nhân và khu vực dịch vụ của bạn.",
            "trackPayouts": "Theo dõi các khoản thanh toán, số dư và lịch sử.",
            "readyToWithdraw": "Sẵn sàng để rút về tài khoản ngân hàng của bạn.",
            "totalEarningsMonth": "Tổng thu nhập (Tháng này)",
            "doingGreat": "Bạn đang làm rất tốt trong tháng này!",
            "greatWork": "Làm tốt lắm!",
            "onlinePrepaid": "Trực tuyến (Trả trước)",
            "manageServiceRequests": "Quản lý các yêu cầu dịch vụ sắp tới và trong quá khứ."
        }
    },
    "Dashboard": {
        "en": {
            "noBookingsYet": "You haven't booked any services yet.",
            "noActiveBookings": "You don't have any active bookings right now.",
            "signOutDevice": "Sign out of your account on this device.",
            "manageLocations": "Manage locations for your service bookings.",
            "defaultLabel": "Default",
            "editBtn": "Edit",
            "manageInfo": "Manage your personal information and preferences."
        },
        "vi": {
            "noBookingsYet": "Bạn chưa đặt bất kỳ dịch vụ nào.",
            "noActiveBookings": "Hiện tại bạn không có bất kỳ đặt chỗ đang hoạt động nào.",
            "signOutDevice": "Đăng xuất tài khoản của bạn trên thiết bị này.",
            "manageLocations": "Quản lý địa điểm cho các đặt chỗ dịch vụ của bạn.",
            "defaultLabel": "Mặc định",
            "editBtn": "Chỉnh sửa",
            "manageInfo": "Quản lý thông tin cá nhân và tùy chọn của bạn."
        }
    },
    "Booking": {
        "en": {
            "whenDoYouNeedIt": "When do you need it?",
            "whereDoWeGo": "Where do we go?",
            "houseFlatBlock": "House / Flat / Block No.",
            "city": "City",
            "pincode": "Pincode",
            "state": "State",
            "backBtn": "Back"
        },
        "vi": {
            "whenDoYouNeedIt": "Bạn cần nó khi nào?",
            "whereDoWeGo": "Chúng ta đi đâu?",
            "houseFlatBlock": "Số Nhà / Căn hộ / Tòa nhà",
            "city": "Thành phố",
            "pincode": "Mã bưu điện",
            "state": "Tỉnh/Bang",
            "backBtn": "Quay lại"
        }
    }
}

# 3. Apply additions
for ns, langs in additions.items():
    if ns not in en:
        en[ns] = {}
    if ns not in vi:
        vi[ns] = {}
    for k, v in langs["en"].items():
        en[ns][k] = v
    for k, v in langs["vi"].items():
        vi[ns][k] = v

# 4. Write back
with open('messages/en.json', 'w', encoding='utf-8') as f:
    json.dump(en, f, indent=2, ensure_ascii=False)
with open('messages/vi.json', 'w', encoding='utf-8') as f:
    json.dump(vi, f, indent=2, ensure_ascii=False)

print("Updated translation JSON files.")
