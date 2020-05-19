import { Component } from '@angular/core';

import { Student } from './models/student.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ai20-lab04';
  displayedColumnsStudents: string[] = ["select", "id", "name", "firstName"];
  students: Student[] = [
      new Student("123456", "studentLastName2", "studentFirstName2"),
      new Student("234567", "studentLastName2", "studentFirstName2"),
      new Student("345678", "studentLastName3", "studentFirstName3")
  ];
}
