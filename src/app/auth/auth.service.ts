import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: string;

    private API_PATH = 'http://localhost:3000';
    constructor(private http: HttpClient) { }

    public login(email: string, password: string) {
        let request: JSON;
        let body: any = {
            "email": email,
            "password": password,
        };
        request = <JSON>body;
        return this.http.post<JSON>(this.API_PATH + '/login', request).pipe(
            tap(
                (token) => { localStorage.setItem('token', token['accessToken']); }
            )
        );
    }

    public logout() {
        localStorage.removeItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    public isAuthenticated() {
        return of(!(localStorage.getItem('token') === null));
    }

    public getUser() {
        if (!(localStorage.getItem('token') === null))
            return JSON.parse(atob(localStorage.getItem('token').split('.')[1])).email;
    }
}