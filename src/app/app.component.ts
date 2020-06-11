import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { LoginDialogComponent } from './auth/login-dialog/login-dialog.component';
import { AuthService } from '../app/auth/auth.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(
        private matDialog: MatDialog,
        private authService: AuthService,
        private router: Router,
    ) {
        //console.log(location.path())
        router.events
            .pipe(
                debounceTime(500)
            )
            .subscribe((val) => {
                if (this.router.url == '/login')
                    this.openLoginDialog();
            }
            )
    }

    ngOnInit(): void {
        this.isAuth = this.authService.isAuthenticated().subscribe((value) => {
            this.isAuthenticated = value;
            if (this.isAuthenticated) {
                this.user = this.authService.getUser();
            }
        });

        this.openedLoginDialog = false;
    }

    ngOnDestroy(): void {
        if (this.isAuth)
            this.isAuth.unsubscribe();
    }

    title = 'ai20-lab04';
    isAuthenticated: boolean;
    isAuth: Subscription;
    user: string;
    routerSub: Subscription;
    openedLoginDialog: boolean;

    navLinks = [
        { label: 'Students', path: 'teacher/course/applicazioni-internet/students' },
        { label: "VMs", path: 'teacher/course/applicazioni-internet/vms' }
    ];
    activeLink = this.navLinks[0];

    openLoginDialog(): void {
        if (this.openedLoginDialog)
            return;
        if(this.router.url != '/login')
            this.router.navigate(['/login']);
        this.openedLoginDialog = true;
        let dialogRef = this.matDialog.open(LoginDialogComponent, {
            height: '50%',
            width: '40%',
        });

        dialogRef.afterClosed().subscribe(value => {
            if (value === "success!") {
                this.isAuthenticated = true;
                this.user = this.authService.getUser();
                if(localStorage.getItem('nextHop') != null) {
                    let nextHop = localStorage.getItem('nextHop');
                    localStorage.removeItem('nextHop');
                    this.router.navigate([nextHop]);
                }  
            }
            this.openedLoginDialog = false;
        });
    }

    logout(): void {
        localStorage.removeItem('token');
        this.isAuthenticated = !this.isAuthenticated;
        this.router.navigate(['/home']);
    }

}
