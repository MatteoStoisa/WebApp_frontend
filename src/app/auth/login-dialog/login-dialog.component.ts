import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  loginForm: FormGroup;

  constructor( public dialogRef: MatDialogRef<LoginDialogComponent>){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  

  closeLoginDialog() {
    this.dialogRef.close();
  }

  get f() { return this.loginForm.controls; }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);

  }

}
