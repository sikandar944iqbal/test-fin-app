import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityScannerService } from '../services/security-scanner.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private _router: Router,
    private _service: SecurityScannerService
  ) { 
    this.addFormControl();
  }

  ngOnInit(): void {
    
  }

  addFormControl() {
    this.loginForm = new FormGroup({
      fullname: new FormControl('', Validators.compose([Validators.required])),
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
      confirmPassword: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  createAccount() {
    debugger
    let data = {};
    data['fullname'] = this.loginForm.get('fullname').value;
    data['username'] = this.loginForm.get('username').value;
    data['password'] = this.loginForm.get('password').value;
    data['userType'] = 'GENERAL';

    this._service.signup(data).subscribe(
      response => {
        debugger
        console.log(response);
      }, error => {
        console.log(error);
      }
    );
  }
}
