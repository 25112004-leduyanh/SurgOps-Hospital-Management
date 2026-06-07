#include <iostream>
#include <string>
#include <vector>
#include <set>
#include <map>
#include <optional>
#include <sstream>

struct Surgery {
    std::string surgery_id;
    std::string patient_name;
    std::string department;
    std::string priority;
    std::optional<std::string> room;
    std::string status;
};

struct InventoryItem {
    std::string item_name;
    int current_stock;
    int threshold;

    bool is_low() const {
        return current_stock < threshold;
    }
};

class SurgOpsDashboard {
private:
    std::vector<Surgery> surgeries;
    std::vector<InventoryItem> inventory;
    const int total_rooms = 4;

public:
    void add_surgery(const Surgery& surgery) {
        surgeries.push_back(surgery);
    }

    void add_inventory(const InventoryItem& item) {
        inventory.push_back(item);
    }

    std::map<std::string, std::string> get_kpis() {
        int total_surgeries = surgeries.size();
        
        std::set<std::string> active_rooms;
        for (const auto& s : surgeries) {
            if (s.room.has_value() && !s.room.value().empty() && 
               (s.status == "Đã xếp lịch" || s.status == "Đang phẫu thuật")) {
                active_rooms.insert(s.room.value());
            }
        }
        int active_rooms_count = active_rooms.size();
        double usage_rate = (static_cast<double>(active_rooms_count) / total_rooms) * 100.0;

        int low_inventory_count = 0;
        for (const auto& item : inventory) {
            if (item.is_low()) {
                low_inventory_count++;
            }
        }

        std::map<std::string, std::string> kpis;
        kpis["Tổng ca phẫu thuật"] = std::to_string(total_surgeries);
        kpis["Phòng đang sử dụng"] = std::to_string(active_rooms_count) + "/" + std::to_string(total_rooms);
        
        std::stringstream ss;
        ss << usage_rate << "%";
        kpis["Tỉ lệ sử dụng phòng"] = ss.str();
        kpis["Vật tư dưới ngưỡng"] = std::to_string(low_inventory_count);

        return kpis;
    }

    std::vector<Surgery> get_emergency_waitlist() {
        std::vector<Surgery> waitlist;
        for (const auto& s : surgeries) {
            if (s.priority == "Cấp cứu" && s.status == "Chờ xếp lịch") {
                waitlist.push_back(s);
            }
        }
        return waitlist;
    }

    void print_dashboard_summary() {
        std::cout << std::string(50, '=') << "\n";
        std::cout << "🏥 TỔNG QUAN HỆ THỐNG SURGOPS (C++ Version)\n";
        std::cout << std::string(50, '=') << "\n";

        std::cout << "\n📊 CHỈ SỐ TỔNG QUAN:\n";
        auto kpis = get_kpis();
        std::vector<std::string> kpi_order = {
            "Tổng ca phẫu thuật", "Phòng đang sử dụng", "Tỉ lệ sử dụng phòng", "Vật tư dưới ngưỡng"
        };
        for (const auto& key : kpi_order) {
            std::cout << " - " << key << ": " << kpis[key] << "\n";
        }

        std::cout << "\n⚠️ CẢNH BÁO HỆ THỐNG:\n";
        auto emergencies = get_emergency_waitlist();
        if (!emergencies.empty()) {
            std::cout << " [CA CẤP CỨU CHỜ XẾP LỊCH]\n";
            for (const auto& e : emergencies) {
                std::cout << "  🚨 " << e.surgery_id << " — " << e.patient_name << " (" << e.department << ")\n";
            }
        }

        bool has_low_inventory = false;
        for (const auto& item : inventory) {
            if (item.is_low()) {
                if (!has_low_inventory) {
                    std::cout << "\n [VẬT TƯ SẮP HẾT]\n";
                    has_low_inventory = true;
                }
                std::cout << "  📦 " << item.item_name << ": " << item.current_stock 
                          << " / ngưỡng " << item.threshold << "\n";
            }
        }
    }
};

int main() {
    SurgOpsDashboard dashboard;

    dashboard.add_surgery({"SX-001", "Trần Văn Long", "Tim mạch", "Cấp cứu", std::nullopt, "Chờ xếp lịch"});
    dashboard.add_surgery({"SX-002", "Nguyễn Thị Mai", "Tiêu hóa", "Thường", std::nullopt, "Chờ xếp lịch"});
    dashboard.add_surgery({"SX-003", "Lê Hoàng Phúc", "Chấn thương", "Cấp cứu", "Phòng mổ B1", "Đã xếp lịch"});
    dashboard.add_surgery({"SX-004", "Phạm Quốc Anh", "Tổng quát", "Thường", "Phòng mổ A2", "Đang phẫu thuật"});
    dashboard.add_surgery({"SX-005", "Đỗ Thị Hồng", "Tổng quát", "Thường", "Phòng mổ A1", "Hồi tỉnh"});
    dashboard.add_surgery({"SX-006", "Võ Minh Khoa", "Tiêu hóa", "Thường", "Phòng mổ A2", "Hoàn thành"});

    dashboard.add_inventory({"Bộ dao mổ", 8, 10});
    dashboard.add_inventory({"Thuốc gây mê", 14, 15});
    dashboard.add_inventory({"Băng gạc", 100, 50});

    dashboard.print_dashboard_summary();

    return 0;
}