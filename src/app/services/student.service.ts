import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Student } from '../models/student.model'

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private API_PATH = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  public getStudents(courseId: number): Observable<Student[]> {
    if(courseId != 0)
      return this.http.get<Student[]>(this.API_PATH + '/course/' + courseId.toString() + '/students');
    return this.http.get<Student[]>(this.API_PATH + '/students');
  }

  public updateStudent(student: Student, courseId: number) {
    student.courseId = courseId.toString();
    return this.http.put<Student>(this.API_PATH+'/students/'+student.id, student);
  }

}
