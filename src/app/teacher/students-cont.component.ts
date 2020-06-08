import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Student } from '../models/student.model'
import { StudentsComponent } from './students.component';

@Component({
  selector: 'app-students-cont',
  templateUrl: './students-cont.component.html',
  styleUrls: ['./students-cont.component.css']
})
export class StudentsContComponent implements OnInit {


  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy() { }

  @Output() studentsDB: Student[] = [
    new Student("123456", "Storti", "Matteo"),
    new Student("234567", "Poretti", "Marta"),
    new Student("345678", "Baglio", "Giacomo"),
    new Student("456789", "Rossi", "Cosimo"),
    new Student("567890", "Bianchi", "Alberto"),
    new Student("678901", "Verdi", "Marco"),
  ];
  
  @Output() students: Student[] = [
      new Student("456789", "Rossi", "Cosimo"),
      new Student("567890", "Bianchi", "Alberto"),
  ];

  performDeleteStudents(toDelete: Student[]) {
    let unselected: Student[] = [];
      for(let student of this.students) {
        if(!toDelete.includes(student)) {
          unselected.push(student);
        }
      }
      this.students = unselected;
  }

  performAddStudent(toAdd: Student) {
    for(let student of this.students) {
      if(student.id === toAdd.id) {
        return;
      }
    }
    this.students.push(toAdd);
  }
  
}
