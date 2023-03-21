import { Component } from '@angular/core';

import { AuthService } from "src/app/shared/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

    constructor(private authService:AuthService) { }

    ngOnInit(): void {
      this.currentUser = this.authService.currentUser;
    }
    username = "";
    password = "";
    currentUser = "";
    error = "";

    logIn() {
      if (this.username == "" || this.password == "") {
        this.error = "Please enter a username and a password";
        } 
        else {
        if(!this.authService.logIn(this.username, this.password)){
          this.error = "Wrong username or password";

      }
      else{
          this.currentUser = this.authService.currentUser;
          this.error = "";
      }
      }
        this.username = "";
        this.password = "";
    }

    logOut() {
        this.authService.logOut();
        this.currentUser = "";
    }
}
