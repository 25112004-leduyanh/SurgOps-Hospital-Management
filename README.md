# 🏥 SurgOps — Hospital Surgery Scheduling & Resource Coordination System

   ![C++](https://img.shields.io/badge/C%2B%2B-20-blue.svg?style=for-the-badge&logo=c%2B%2B)
   ![Python](https://img.shields.io/badge/Python-3.10+-blue.svg?style=for-the-badge&logo=python)
   ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
   ![OOP Paradigm](https://img.shields.io/badge/Paradigm-OOP%20%2F%20DDD-green.svg?style=for-the-badge)
   ![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

SurgOps là giải pháp phần mềm toàn diện được thiết kế chuyên biệt dành cho **Điều dưỡng trưởng phòng mổ** và ban quản lý bệnh viện. Hệ thống giải quyết triệt để bài toán tối ưu hóa hiệu suất sử dụng phòng mổ, điều phối nhân lực y tế, tự động hóa việc xếp lịch dựa trên mức độ ưu tiên lâm sàng và giám sát nghiêm ngặt ngưỡng an toàn vật tư tiêu hao trong thời gian thực.

Dự án được triển khai song song hai phiên bản Core mạnh mẽ (**C++ Engine** đem lại hiệu năng tính toán tối đa và **Python Service** tối ưu cho việc mở rộng tích hợp API) kết hợp cùng giao diện **Dashboard Web** trực quan.

---

## 👥 Thành Viên Thực Hiện (Team Members)

Dự án được nghiên cứu và phát triển bởi nhóm sinh viên thuộc Đề tài 10:

| STT | Họ và Tên | MSSV | Vai Trò | Nhiệm Vụ Đóng Góp Chính |
| :---: | :--- | :---: | :---: | :--- |
| 1 | 👑 **Vương Đức Đạt** | **25112239** | **Nhóm trưởng (Leader)** | Quản lý tiến độ, Thiết kế kiến trúc hệ thống OOP, Phát triển module Core Engine. |
| 2 | 🧑‍💻 **Lê Duy Anh** | **25112004** | **Thành viên** | Phát triển thuật toán xếp lịch ưu tiên và quản lý phân khoa bệnh viện. |
| 3 | 🧑‍💻 **Nguyễn Bùi Tú** | **25112119** | **Thành viên** | Thiết kế UI Dashboard Web, xử lý luồng hiển thị dữ liệu trực quan. |
| 4 | 🧑‍💻 **Nguyễn Khắc Trung Dũng** | **25112030** | **Thành viên** | Xây dựng logic giám sát ngưỡng an toàn vật tư tiêu hao và quản lý cảnh báo hệ thống. |

---

## 🚀 Tính Năng Cốt Lõi (Core Features)

Hệ thống được phát triển bám sát quy trình vận hành khắt khen của môi trường y tế:

* **Tiếp Nhận & Duyệt Vật Tư Tự Động**: Đánh giá tính khả dụng của dụng cụ/vật tư thiết yếu trước khi phê duyệt ca mổ. Cảnh báo tức thời nếu vật tư rơi vào ngưỡng báo động nguy hiểm.
* **Xếp Lịch Thông Minh (Priority-Driven Scheduler)**: Tự động phân tách và ưu tiên xử lý các ca bệnh "Cấp cứu" trước các ca mổ "Thường", khớp chính xác phòng mổ trống phù hợp chuyên khoa.
* **Quản Lý Vòng Đời Ca Mổ (State Machine)**: Theo dõi chặt chẽ dòng trạng thái liên tục của bệnh nhân: *Chờ xếp lịch ➔ Đã xếp lịch ➔ Đang phẫu thuật ➔ Hồi tỉnh ➔ Hồi sức ➔ Chuyển khoa*.
* **Giám Sát KPI Thời Gian Thực (Live Analytics)**: Đo lường chính xác tổng ca phẫu thuật, tỉ lệ lấp đầy phòng mổ (Usage Rate %) phục vụ công tác điều phối vĩ mô.
* **Y Lệnh & Chăm Sóc Hậu Phẫu**: Số hóa quy trình ghi nhận y lệnh của bác sĩ và nhật ký theo dõi bệnh trạng của điều dưỡng tại phòng hồi sức.

---

## 📐 Kiến Trúc Thực Thi Hướng Đối Tượng (OOP Architecture)

Áp dụng các nguyên lý SOLID và tư duy DDD (Domain-Driven Design), cấu trúc các lớp được phân rã một cách tường minh, đảm bảo tính đóng gói (Encapsulation) cao và dễ dàng mở rộng:

### 1. Thành Phần Miền (Domain Entities)
* `Surgery`: Đóng gói toàn bộ dữ liệu định danh ca mổ, thông tin bệnh nhân, phân khoa, mức độ ưu tiên lâm sàng và trạng thái hiện hành.
* `InventoryItem`: Quản lý thực thể vật tư, tích hợp cơ chế tự dự báo rủi ro `is_low()` dựa trên mức biên an toàn (`threshold`).
* `Person` *(Abstract Class)* ➔ Kế thừa mở rộng sang `Doctor`, `Nurse`, `Technician` nhằm hiện thực hóa việc phân quyền quản lý nhân sự chuyên khoa.

### 2. Thiết Kế Mẫu Áp Dụng (Applied Design Patterns)
* **State Pattern (Quản lý trạng thái)**: Sử dụng lớp trừu tượng `SurgeryState` đa hình để xử lý logic chuyển trạng thái an toàn, loại bỏ triệt để các cấu trúc `if-else`/`switch-case` lồng nhau phức tạp.
* **High Composition over Inheritance**: Bộ điều phối trung tâm `SurgOpsDashboard` chứa các danh sách `std::vector<Surgery>` và `std::vector<InventoryItem>`, tuân thủ chặt chẽ nguyên lý Single Responsibility Principle (SRP).

```mermaid
classDiagram
    class SurgOpsDashboard {
        -vector~Surgery~ surgeries
        -vector~InventoryItem~ inventory
        -int total_rooms
        +add_surgery(Surgery s)
        +add_inventory(InventoryItem i)
        +get_kpis() Map
        +get_emergency_waitlist() vector~Surgery~
        +print_dashboard_summary()
    }
    class Surgery {
        +string surgery_id
        +string patient_name
        +string department
        +string priority
        +optional~string~ room
        +string status
    }
    class InventoryItem {
        +string item_name
        +int current_stock
        +int threshold
        +is_low() bool
    }
    SurgOpsDashboard "1" *-- "many" Surgery : Composition
    SurgOpsDashboard "1" *-- "many" InventoryItem : Composition
