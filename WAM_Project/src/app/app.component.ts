import { Component } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';
//import { LoginWithGithubService } from 'ngx-login-with-github';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (private authService:AuthService,) {}
  title = 'WAM_Project';
  baseUrl = 'http://localhost:8010';
  user : any;

  ngOnInit() {
  }
  logout(){
    this.authService.logout();
  }
}

