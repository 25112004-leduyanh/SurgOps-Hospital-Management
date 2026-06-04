export class Surgery {
    constructor(id, patient, doctor, room, priority) {
        this.id = id;
        this.patient = patient;
        this.doctor = doctor;
        this.room = room;
        this.priority = priority;
        this.status = "Pending"; 
    }

    nextState(nextStatus) {
        const states = ["Pending", "Scheduled", "InProgress", "Recovery", "Completed"];
        if (states.includes(nextStatus)) {
            this.status = nextStatus;
            return true;
        }
        return false;
    }
}
