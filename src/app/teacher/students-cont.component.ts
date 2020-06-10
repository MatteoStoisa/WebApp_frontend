import { Component, OnInit } from '@angular/core';
import { Subscription, concat } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Student } from '../models/student.model'
import { StudentService  } from '../services/student.service'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-students-cont',
  templateUrl: './students-cont.component.html',
  styleUrls: ['./students-cont.component.css']
})
export class StudentsContComponent implements OnInit {

  constructor(private studentService: StudentService,
              private authService: AuthService) { }
  
  students: Student[] = [];
  studentsDB: Student[] = [];
  studentsSub: Subscription;
  studentsDBSub: Subscription;
  updateSub: Subscription;

  ngOnInit(): void { 
    this.studentsSub = this.updateStudentList().subscribe();
    this.studentsDBSub = this.updateStudentDBList().subscribe();
  }

  ngOnDestroy() { 
    if(this.studentsSub)
      this.studentsSub.unsubscribe();
    if(this.studentsDBSub)
      this.studentsDBSub.unsubscribe(); 
    if(this.updateSub)
      this.updateSub.unsubscribe();
  }

  performDeleteStudents(toDelete: Student[]) {
      for(let toDel of toDelete) {
        //TODO: may not work with multiple requests because of the FOR!
        if(this.updateSub)
          this.updateSub.unsubscribe();
        this.updateSub = concat(this.studentService.updateStudent(toDel,0), this.updateStudentList()).subscribe(
          (event) => {console.log("updating students observable", event)}
        );
      }
  }

  performAddStudent(toAdd: Student) {
    for(let student of this.students) {
      if(student.id === toAdd.id) {
        return;
      }
    }
    
    if(this.updateSub)
      this.updateSub.unsubscribe();
    this.updateSub = concat(this.studentService.updateStudent(toAdd,1), this.updateStudentList()).subscribe(
      (event) => {console.log("updating students observable", event)}
    );
  }

  private updateStudentList() {
    return this.studentService.getStudents(1).pipe(
      tap(
        (student: Student[]) => {
          this.students = [];
          for (let stud of student) {
            this.students.push(stud);
          }
        }
      )
    )
  }

  private updateStudentDBList() {
    return this.studentService.getStudents(0).pipe(
      tap(
        (student: Student[]) => {
          this.studentsDB = [];
          for (let stud of student) {
            this.studentsDB.push(stud);
          }
        }
      )
    )
  }
}
