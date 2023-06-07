import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn=false;
  username:string = '';
  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) { 
    
  }
  /* 
    Check if the user is logged in
  */
  isLoggedIn() {
    const token = localStorage.getItem('jwt_token');
      if (token) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
getToken(){ 
  return localStorage.getItem('jwt_token');
}
url = 'http://localhost:8010/api';

    getUserName():Observable<any> {
      const token = this.getToken();
      const headers = new HttpHeaders().set('Authorization', `${token}`);
    
      return this.http.get<{ username: string }>(`${this.url}/auth/username`, { headers });
    }
   
    setUsername(username:string){
      this.username=username;
      return this.username;
    }

    /* 
      Log the user out
    */
    logout() {
      localStorage.removeItem('jwt_token');
      this.router.navigate(['/login']);
      this.loggedIn=false;

    }// renvoie une promesse qui est résolue si l'utilisateur est loggué

    
  getUserFiles() { 
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    console.log(this.username + " on getuserfiles function");
    const params = new HttpParams().set('username', this.username);
    const url = `${this.url}/workspace`;
    console.log(url);
    return this.http.get(url, { headers, params }); 

  } 
  sharePlugin(file:string){
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    const params = new HttpParams().set('file', file).set('username', this.username);
  
    this.http.get(`${this.url}/workspace/share`,{headers, params}).subscribe(
      (response: any) => {
        if (response.message) {
          this.snackBar.open( response.message, "Close", {duration: 5000}); // display success message
        } else {
          console.log('Upload successful');
          console.log(response); // display plugin data
        }
      },
      (error: any) => {
        if (error.status === 409 && error.error.message) {
          this.snackBar.open(error.error.message + " & is shared", "Close", {duration: 5000}) ;
          console.log(error.error.message); // display "plugin already exists" message
        } else {
          console.error(error);
        }
      }
    );
  }
  deletePlugin(file:string){
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    const params = new HttpParams().set('file', file).set('username', this.username);

    this.http.get(`${this.url}/workspace/delete`,{headers, params}).subscribe(
      response => console.log('Delete successful'),
      error => console.error(error)
    );
  }
}




 