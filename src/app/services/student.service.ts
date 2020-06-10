import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Student } from '../models/student.model'

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    private API_PATH = 'http://localhost:3000';
    constructor(private http: HttpClient) { }

    public getStudents(courseId: number): Observable<Student[]> {
        if (courseId != 0)
            return this.http.get<Student[]>(this.API_PATH + '/course/' + courseId.toString() + '/students');
        return this.http.get<Student[]>(this.API_PATH + '/students');
    }

    public updateStudent(student: Student, courseId: number): Observable<Student> {
        student.courseId = courseId.toString();
        return this.http.put<Student>(this.API_PATH + '/students/' + student.id, student);
    }

}
