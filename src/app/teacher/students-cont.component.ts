import { Component, OnInit } from '@angular/core';

import { Student } from '../models/student.model'

@Component({
  selector: 'app-students-cont',
  templateUrl: './students-cont.component.html',
  styleUrls: ['./students-cont.component.css']
})
export class StudentsContComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  studentsDB: Student[] = [
    new Student("123456", "Storti", "Matteo"),
    new Student("234567", "Poretti", "Matilde"),
    new Student("345678", "Baglio", "Giacomo"),
    new Student("456789", "Rossi", "Cosimo"),
    new Student("567890", "Bianchi", "Alberto"),
  ];
  
  students: Student[] = [
      new Student("456789", "Rossi", "Cosimo"),
      new Student("567890", "Bianchi", "Alberto"),
  ];

}
