class Person {
    constructor(id, name, role) {
        this.id = id;
        this.name = name;
        this.role = role;
    }
}

export class Doctor extends Person {
    constructor(id, name, specialty, status) {
        super(id, name, "Doctor");
        this.specialty = specialty; 
        this.status = status;       
    }
}

export class Patient extends Person {
    constructor(id, name, age, gender, diagnosis) {
        super(id, name, "Patient");
        this.age = age;
        this.gender = gender;
        this.diagnosis = diagnosis; 
    }
}