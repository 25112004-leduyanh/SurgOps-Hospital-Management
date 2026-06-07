from dataclasses import dataclass
from typing import List, Optional


@dataclass
class Surgery:
    surgery_id: str
    patient_name: str
    department: str
    priority: str
    room: Optional[str]
    status: str


@dataclass
class InventoryItem:
    item_name: str
    current_stock: int
    threshold: int
    
    @property
    def is_low(self) -> bool:
        return self.current_stock < self.threshold


class SurgOpsDashboard:
    def __init__(self):
        self.surgeries: List[Surgery] = []
        self.inventory: List[InventoryItem] = []
        self.total_rooms = 4

    def add_surgery(self, surgery: Surgery):
        self.surgeries.append(surgery)

    def add_inventory(self, item: InventoryItem):
        self.inventory.append(item)

    def get_kpis(self):

        total_surgeries = len(self.surgeries)
        active_rooms = len(set(s.room for s in self.surgeries if s.room and s.status in ["Đã xếp lịch", "Đang phẫu thuật"]))
        usage_rate = (active_rooms / self.total_rooms) * 100
        low_inventory_count = sum(1 for item in self.inventory if item.is_low)

        return {
            "Tổng ca phẫu thuật": total_surgeries,
            "Phòng đang sử dụng": f"{active_rooms}/{self.total_rooms}",
            "Tỉ lệ sử dụng phòng": f"{usage_rate}%",
            "Vật tư dưới ngưỡng": low_inventory_count
        }

    def get_emergency_waitlist(self) -> List[Surgery]:
     
        return [s for s in self.surgeries if s.priority == "Cấp cứu" and s.status == "Chờ xếp lịch"]

    def print_dashboard_summary(self):
        print("="*50)
        print("🏥 TỔNG QUAN HỆ THỐNG SURGOPS")
        print("="*50)
        
        # In KPIs
        print("\n📊 CHỈ SỐ TỔNG QUAN:")
        for key, value in self.get_kpis().items():
            print(f" - {key}: {value}")

        # In Cảnh báo
        print("\n⚠️ CẢNH BÁO HỆ THỐNG:")
        emergencies = self.get_emergency_waitlist()
        if emergencies:
            print(" [CA CẤP CỨU CHỜ XẾP LỊCH]")
            for e in emergencies:
                print(f"  🚨 {e.surgery_id} — {e.patient_name} ({e.department})")
        
        low_items = [i for i in self.inventory if i.is_low]
        if low_items:
            print("\n [VẬT TƯ SẮP HẾT]")
            for item in low_items:
                print(f"  📦 {item.item_name}: {item.current_stock} / ngưỡng {item.threshold}")

if __name__ == "__main__":
    dashboard = SurgOpsDashboard()

    dashboard.add_surgery(Surgery("SX-001", "Trần Văn Long", "Tim mạch", "Cấp cứu", None, "Chờ xếp lịch"))
    dashboard.add_surgery(Surgery("SX-002", "Nguyễn Thị Mai", "Tiêu hóa", "Thường", None, "Chờ xếp lịch"))
    dashboard.add_surgery(Surgery("SX-003", "Lê Hoàng Phúc", "Chấn thương", "Cấp cứu", "Phòng mổ B1", "Đã xếp lịch"))
    dashboard.add_surgery(Surgery("SX-004", "Phạm Quốc Anh", "Tổng quát", "Thường", "Phòng mổ A2", "Đang phẫu thuật"))
    dashboard.add_surgery(Surgery("SX-005", "Đỗ Thị Hồng", "Tổng quát", "Thường", "Phòng mổ A1", "Hồi tỉnh"))
    dashboard.add_surgery(Surgery("SX-006", "Võ Minh Khoa", "Tiêu hóa", "Thường", "Phòng mổ A2", "Hoàn thành"))


    dashboard.add_inventory(InventoryItem("Bộ dao mổ", 8, 10))
    dashboard.add_inventory(InventoryItem("Thuốc gây mê", 14, 15))
    dashboard.add_inventory(InventoryItem("Băng gạc", 100, 50)) # Món này an toàn, không báo động


    dashboard.print_dashboard_summary()