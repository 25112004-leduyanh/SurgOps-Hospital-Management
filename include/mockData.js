// Dữ liệu giả lập ban đầu cho hệ thống Quản lý lịch mổ (SurgOps)

export const initialDoctors = [
    { id: "DOC001", name: "BS. Nguyễn Văn An", specialty: "Ngoại tim mạch", status: "Sẵn sàng" },
    { id: "DOC002", name: "BS. Trần Thị Bình", specialty: "Chấn thương chỉnh hình", status: "Đang mổ" },
    { id: "DOC003", name: "BS. Lê Hoàng Minh", specialty: "Ngoại thần kinh", status: "Sẵn sàng" }
];

export const initialPatients = [
    { id: "PAT001", name: "Lê Duy Anh", age: 21, gender: "Nam", diagnosis: "Viêm ruột thừa cấp" },
    { id: "PAT002", name: "Phạm Minh Thư", age: 45, gender: "Nữ", diagnosis: "Hẹp van tim" }
];

export const initialRooms = [
    { id: "OR001", name: "Phòng mổ số 1", type: "Khẩn cấp", isAvailable: false },
    { id: "OR002", name: "Phòng mổ số 2", type: "Tiêu chuẩn", isAvailable: true },
    { id: "OR003", name: "Phòng mổ số 3", type: "Tiêu chuẩn", isAvailable: true }
];

export const initialSupplies = [
    { id: "SUP001", name: "Dao mổ siêu âm", quantity: 15, unit: "Cái", status: "Bình thường" },
    { id: "SUP002", name: "Chỉ khâu phẫu thuật", quantity: 120, unit: "Hộp", status: "Bình thường" },
    { id: "SUP003", name: "Găng tay vô trùng", quantity: 8, unit: "Hộp", status: "Sắp hết" }
];
