import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_PATH = 'http://localhost:3000';
  constructor(private http: HttpClient) {
      localStorage.removeItem('token');
  }

  public login(email: string, password: string) {
    let request: JSON;
    let body: any = {
        "email": email,
        "password": password,
      };
    request = <JSON>body;
    return this.http.post<JSON>(this.API_PATH+'/login', request).pipe(
        tap (
            (token) => {localStorage.setItem('token', token['accessToken'])}
        )
    );
  }

  getToken() {
      return localStorage.getItem('token');
  }
}