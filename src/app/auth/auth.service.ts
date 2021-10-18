import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: boolean = false;
  
  constructor() { }

  setAsLoggedIn() {
    this.loggedIn = true;
  }

  setAsLoggedOut() {
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
