import { Component, OnInit } from '@angular/core';
import { Subscription, concat } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Student } from '../models/student.model'
import { StudentService } from '../services/student.service'

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
    studentsDBSub: Subscription;
    updateSub: Subscription;

    ngOnInit(): void {
        this.studentsSub = this.updateStudentList().subscribe();
        this.studentsDBSub = this.updateStudentDBList().subscribe();
    }

    ngOnDestroy() {
        if (this.studentsSub)
            this.studentsSub.unsubscribe();
        if (this.studentsDBSub)
            this.studentsDBSub.unsubscribe();
        if (this.updateSub)
            this.updateSub.unsubscribe();
    }

    performDeleteStudents(toDelete: Student[]): void {
        if (toDelete.length == 0) {
            if (this.updateSub)
                this.updateSub.unsubscribe();
            this.updateSub = this.updateStudentList().subscribe();
            return;
        }
        else {
            let toDel = toDelete.pop();
            if (this.updateSub)
                this.updateSub.unsubscribe();
            this.updateSub = this.studentService.updateStudent(toDel, 0)
                .subscribe((val) => {
                    this.performDeleteStudents(toDelete)
                });
        }
    }

    performAddStudent(toAdd: Student) {
        for (let student of this.students) {
            if (student.id === toAdd.id) {
                return;
            }
        }

        if (this.updateSub)
            this.updateSub.unsubscribe();
        this.updateSub = concat(
            this.studentService.updateStudent(toAdd, 1),
            this.updateStudentList()
        ).subscribe();
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
