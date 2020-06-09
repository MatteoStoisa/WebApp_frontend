import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoginDialogComponent } from './auth/login-dialog/login-dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'ai20-lab04';

    ngOnInit() { }

    constructor(private matDialog: MatDialog) { }

    navLinks = [
        {label: 'Students', path: 'teacher/course/applicazioni-internet/students'}, 
        {label: "VMs", path: 'teacher/course/applicazioni-internet/vms'}
    ];
    activeLink = this.navLinks[0];

    openLoginDialog() {
        const dialogConfig = new MatDialogConfig();
        this.matDialog.open(LoginDialogComponent, {
            height: '50%',
            width: '40%',
        });
      }

    
      
}
