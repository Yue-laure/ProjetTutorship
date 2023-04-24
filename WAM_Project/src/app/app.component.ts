import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // title = 'WAM_Project';

  constructor( public router:Router,public route:ActivatedRoute,  ){}

  ngOnInit(){


  }

//click event for filscomponent  wimmics and burns-audio
tabEvent(index:number){
  let pathList=[' ','plugin-burns','plugin-wimmics'];
  // this.router.navigate(['/home',pathList[index],
  this.router.navigate([pathList[index],
  ]);
}
}
