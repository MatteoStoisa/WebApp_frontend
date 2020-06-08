import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Student } from '../models/student.model'
import { StudentsComponent } from './students.component';
import { StudentService  } from '../services/student.service'
import { Subscription, concat } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-students-cont',
  templateUrl: './students-cont.component.html',
  styleUrls: ['./students-cont.component.css']
})
export class StudentsContComponent implements OnInit {

  constructor(private studentService: StudentService) { }
  
  students: Student[] = [];
  studentsDB: Student[] = [];
  studentsSub: Subscription;
  updateSub: Subscription;

  ngOnInit(): void { 
    this.studentsSub = this.updateStudentList().subscribe();
    this.studentService.getStudents(0).subscribe(
      (response) => {
        this.studentsDB = response;
      }
    )
  }

  ngOnDestroy() { 
    if(this.studentsSub)
      this.studentsSub.unsubscribe();
  }

  performDeleteStudents(toDelete: Student[]) {
      for(let toDel of toDelete) {
        //TODO: may not work with multiple requests!
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
          console.log('updated value', this.students);
        }
      )
    )
  }
  
}
