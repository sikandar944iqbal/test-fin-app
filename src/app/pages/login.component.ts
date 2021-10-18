import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SecurityScannerService } from '../services/security-scanner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoginFailed: boolean= false;
  isLoading: boolean = false;
  constructor(
    private _router: Router,
    private _service: SecurityScannerService,
    private _authService: AuthService
  ) { 
    this.addFormControl();
  }

  ngOnInit(): void {
    this._authService.setAsLoggedOut();
    localStorage.clear();
  }

  addFormControl() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  login() {
    this.isLoading = true;
    this.isLoginFailed = false;
    let data = {};
    data['username'] = this.loginForm.get('username').value;
    data['password'] = this.loginForm.get('password').value;
    this._service.login(data).subscribe(
      response => {
        if (!!response && !!response['Authorization']) {
          localStorage.setItem('token', response['Authorization']);
          localStorage.setItem('user_id', data['username']);
          this._authService.setAsLoggedIn();
          localStorage.setItem('is_logged_in', 'true');
          this._router.navigateByUrl('/home/home');
          this.isLoading = false;
        }
      }, error => {
        this.isLoginFailed = true;
        this.isLoading = false;
      }
    );
    
  }

}
