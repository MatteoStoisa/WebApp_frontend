import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Student } from '../models/student.model'
import {AuthService} from '../auth/auth.service'
import {LoginDialogComponent} from '../auth/login-dialog/login-dialog.component'

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private API_PATH = 'http://localhost:3000';
  constructor(private http: HttpClient,
              private authService: AuthService) {}

  buildHeader() {
    console.log("requested token");
    console.log(this.authService.getToken());
    return {headers: new HttpHeaders()
                .set('Authorization',  `Bearer ${this.authService.getToken()}`)
            }
  }

  public getStudents(courseId: number): Observable<Student[]> {
    if(courseId != 0)
      return this.http.get<Student[]>(this.API_PATH + '/course/' + courseId.toString() + '/students');
    return this.http.get<Student[]>(this.API_PATH + '/students', this.buildHeader());
  }

  public updateStudent(student: Student, courseId: number) {
    student.courseId = courseId.toString();
    return this.http.put<Student>(this.API_PATH+'/students/'+student.id, student, this.buildHeader());
  }

}
