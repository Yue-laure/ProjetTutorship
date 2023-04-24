import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http'; 
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})


export class UserProfileComponent implements OnInit {
  baseUrl = 'http://localhost:8010';
  constructor(private http: HttpClient, private authService:AuthService) { }
username: string = '';
 value = this.authService.getUserName().subscribe(
   (    value: any) => {
      this.username = value;
    console.log(this.username) } 
  );   
   


  ngOnInit(): void {
  }

  envoieForm() {

  } 
  

  onFileUpload(event: any) {

   const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('url', 'http://localhost:8010/api/file');
  
   formData.append("username",this.username);
 
    this.http.post(this.baseUrl + '/api/file', 
    formData).subscribe(
      response => console.log('Upload successful'),
      error => console.error(error)
    ); /*
    let url = this.baseUrl + '/api/file';
    fetch (url, {
      method : 'POST',
      body : formData
    }).then(response => {
      console.log(response);
}).catch(error => {
      console.log(error);
    }
); */
  }
  logout(){
    this.authService.logout();
  }

}