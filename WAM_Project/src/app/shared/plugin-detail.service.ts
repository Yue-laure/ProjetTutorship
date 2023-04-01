import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PluginDetailService {

  constructor(private router:Router) { 
    this.router.navigate(['/plugin-Detail',URL]);
  }
}
