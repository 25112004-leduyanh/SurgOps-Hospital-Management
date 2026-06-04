import { initialDoctors, initialPatients, initialRooms, initialSupplies } from '../include/mockData.js';
import { Doctor, Patient } from './person.js';
import { Surgery } from './surgery.js';

class HospitalManager {
    constructor() {
        this.doctors = [];
        this.patients = [];
        this.rooms = [...initialRooms];
        this.supplies = [...initialSupplies];
        this.surgeries = [];

        this.initData();
    }

    // 1. KHỞI TẠO ĐỐI TƯỢNG OOP TỪ DỮ LIỆU TĨNH (MOCK DATA)
    initData() {
        // Tạo các đối tượng Doctor từ Class Doctor (OOP)
        initialDoctors.forEach(doc => {
            this.doctors.push(new Doctor(doc.id, doc.name, doc.specialty, doc.status));
        });

        // Tạo các đối tượng Patient từ Class Patient (OOP)
        initialPatients.forEach(pat => {
            this.patients.push(new Patient(pat.id, pat.name, pat.age, pat.gender, pat.diagnosis));
        });

        // Khởi tạo sẵn một Ca mổ mẫu bằng Class Surgery để hiển thị
        if (this.patients.length > 0 && this.doctors.length > 0) {
            const sampleSurgery = new Surgery(
                "SURG001",
                this.patients[0], // Đối tượng Patient OOP
                this.doctors[0],  // Đối tượng Doctor OOP
                this.rooms[0],
                "Khẩn cấp"
            );
            this.surgeries.push(sampleSurgery);
        }
    }

    // 2. CASE THÊM CA MỔ MỚI (XỬ LÝ LOGIC HƯỚNG ĐỐI TƯỢNG)
    createNewSurgery(patientName, age, gender, diagnosis, doctorId, roomId, priority) {
        // Tạo đối tượng bệnh nhân mới
        const patientId = `PAT${String(this.patients.length + 1).padStart(3, '0')}`;
        const newPatient = new Patient(patientId, patientName, age, gender, diagnosis);
        this.patients.push(newPatient);

        // Tìm bác sĩ và phòng mổ tương ứng trong danh sách quản lý
        const selectedDoctor = this.doctors.find(d => d.id === doctorId);
        const selectedRoom = this.rooms.find(r => r.id === roomId);

        // Tạo ca mổ mới bằng Class Surgery
        const surgeryId = `SURG${String(this.surgeries.length + 1).padStart(3, '0')}`;
        const newSurgery = new Surgery(surgeryId, newPatient, selectedDoctor, selectedRoom, priority);
        
        this.surgeries.push(newSurgery);
        console.log(`[OOP Success] Đã tạo ca mổ thành công: ${surgeryId}`);
        
        // Gọi hàm cập nhật lại giao diện HTML sau khi thêm dữ liệu thành công
        this.renderInterface();
        return newSurgery;
    }

    // 3. CASE CHUYỂN TRẠNG THÁI CA MỔ (ÁP DỤNG STATE PATTERN)
    advanceSurgeryStatus(surgeryId, nextStatus) {
        const surgery = this.surgeries.find(s => s.id === surgeryId);
        if (surgery) {
            // Chạy hàm nextState() trong Class Surgery để check xem có hợp lệ theo State Pattern không
            const isSuccess = surgery.nextState(nextStatus);
            if (isSuccess) {
                console.log(`[State Pattern] Ca mổ ${surgeryId} chuyển sang trạng thái: ${nextStatus}`);
                this.renderInterface(); // Vẽ lại giao diện tương ứng với trạng thái mới
            }
        }
    }

    // 4. ĐỒNG BỘ DỮ LIỆU LÊN GIAO DIỆN HTML (BẮT SỰ KIỆN DOM)
    renderInterface() {
        // Hàm này sẽ tìm các bảng (Table), các thẻ danh sách trên HTML của bạn
        // Sau đó dùng vòng lặp để chèn dữ liệu OOP vào cho hiển thị lên màn hình.
        
        const tableBody = document.getElementById('surgery-list-table');
        if (!tableBody) return; // Nếu không ở trang danh sách mổ thì bỏ qua

        tableBody.innerHTML = ''; // Xóa dữ liệu cũ đi để nạp mới

        this.surgeries.forEach(surg => {
            const row = `
                <tr>
                    <td class="padding-standard font-bold">${surg.id}</td>
                    <td class="padding-standard">${surg.patient.name} (${surg.patient.age} tuổi)</td>
                    <td class="padding-standard">${surg.doctor.name} - ${surg.doctor.specialty}</td>
                    <td class="padding-standard">${surg.room.name}</td>
                    <td class="padding-standard"><span class="badge-${surg.priority === 'Khẩn cấp' ? 'red' : 'blue'}">${surg.priority}</span></td>
                    <td class="padding-standard"><span class="status-badge">${surg.status}</span></td>
                    <td class="padding-standard">
                        <button class="btn-next-state" data-id="${surg.id}">Chuyển bước</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
        
        this.setupEventListeners();
    }

    // Lắng nghe các nút bấm trên giao diện
    setupEventListeners() {
        const buttons = document.querySelectorAll('.btn-next-state');
        buttons.forEach(btn => {
            btn.onclick = (e) => {
                const id = e.target.getAttribute('data-id');
                const surg = this.surgeries.find(s => s.id === id);
                
                // Quy trình chuyển trạng thái tự động theo State Pattern
                let next = "Scheduled";
                if (surg.status === "Scheduled") next = "InProgress";
                else if (surg.status === "InProgress") next = "Recovery";
                else if (surg.status === "Recovery") next = "Completed";

                this.advanceSurgeryStatus(id, next);
            };
        });
    }
}

// Khởi chạy bộ quản lý hệ thống ngay khi trang web tải xong
document.addEventListener('DOMContentLoaded', () => {
    window.manager = new HospitalManager();
    window.manager.renderInterface();
});
