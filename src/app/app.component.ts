import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoginDialogComponent } from './auth/login-dialog/login-dialog.component';
import { AuthService} from '../app/auth/auth.service'
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'ai20-lab04';
    isAuthenticated: boolean;
    isAuth: Subscription;
    user:string;

    ngOnInit(): void { 
        this.isAuth = this.authService.isAuthenticated().subscribe((value) => {
            this.isAuthenticated = value;
            if(this.isAuthenticated) {
                this.user = this.authService.getUser();
            }
        });
    }

    ngOnDestroy(): void {
        if(this.isAuth)
            this.isAuth.unsubscribe();
    }

    constructor(private matDialog: MatDialog,
                private authService: AuthService) { }

    navLinks = [
        {label: 'Students', path: 'teacher/course/applicazioni-internet/students'}, 
        {label: "VMs", path: 'teacher/course/applicazioni-internet/vms'}
    ];
    activeLink = this.navLinks[0];

    openLoginDialog(): void {
        let dialogRef = this.matDialog.open(LoginDialogComponent, {
            height: '50%',
            width: '40%',
        }, );

        dialogRef.afterClosed().subscribe(value => {
            if(value === "success!") {
                this.isAuthenticated = true;
                this.user = this.authService.getUser();
            } 
        });
    }

    logout(): void {
        this.authService.logout();
        this.notifyLoginLogout();
    }

    notifyLoginLogout(): void {
        this.isAuthenticated = !this.isAuthenticated;
    }
      
}
