import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormsModule } from '@angular/forms'; 

import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-profile',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private http: HttpClient, private router:Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

    password : string = ""; 
    email : string="";
    username : string="";
    url =  "http://localhost:8010/api/auth";

    register(){
      const body = { email: this.email, username : this.username, password: this.password };
      this.http.post(this.url + '/register', body).subscribe(
        response => { 
          this.router.navigate(['/home']);
          this.snackBar.open("Welcome", "Cole", {duration: 5000});
     
        }, 
  
        (error) => {
          //console.log the type of error.status
          if (error.status == 409) {
           this.snackBar.open("User with this email already exists", "close", {duration: 5000}); 
          } 
          else if (error.status==400) {
            this.snackBar.open("Invalid parameters", "close", {duration: 5000}); 
           }
           else {
            this.snackBar.open("Something went wrong. No account created", "close", {duration: 5000});
           }
          }
     )
    }
    
  
    
  
  }