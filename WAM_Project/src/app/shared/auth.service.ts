import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  
  users = [ ["admin", "admin",true], ["user", "user",false] ];
  currentUser = "";
  loggedIn = false;
  isCurrentUserAdmin:boolean|string = false;


  logIn(username:string , password:string) {
    let user = this.users.find(u => u[0] == username && u[1] == password);
    if(user) {
      this.loggedIn = true;
      this.isCurrentUserAdmin = user[2];    
      this.currentUser = username;
      return true
    }
        
    return false
  }

  logOut() {
    this.currentUser = "";
    this.loggedIn = false;
  }

  isAdmin() {
    const isUserAdmin = new Promise(
      (resolve, reject) => {
        resolve(this.isCurrentUserAdmin); }
    )

    return isUserAdmin;
  }

  isLogged() {
    const isLogged = new Promise(
      (resolve, reject) => {
        resolve(this.loggedIn); }
    )

    return isLogged;
  }
}