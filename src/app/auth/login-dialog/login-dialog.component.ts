import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service'

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

    authSub: Subscription;
    isAuthenticated: boolean;
    email;
    password;
    failMessage: string;

    constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
        private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        if (this.authSub)
            this.authSub.unsubscribe();
    }

    emailControl = new FormControl('', [Validators.required, Validators.email]);
    passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

    onSubmit() {
        if (this.emailControl.invalid || this.passwordControl.invalid) {
            return;
        }
        if (this.authSub)
            this.authSub.unsubscribe();
        this.authSub = this.authService.login(this.email, this.password).subscribe(val => {
            if (val.hasOwnProperty("accessToken")) {
                this.dialogRef.close("success!");
            }
        });
        setTimeout(() => { this.failMessage = "wrong email or password"; }, 500);
    }

}
