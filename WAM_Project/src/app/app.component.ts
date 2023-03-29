import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WAM_Project';
  constructor(  ){}

  ngOnInit(){
    function popupwindow(url: string , title: string | undefined, w:  number, h: number) {
      let wLeft:number
      let wTop:number
      wLeft = window.screenLeft ? window.screenLeft : window.screenX;
      wTop = window.screenTop ? window.screenTop : window.screenY;

      var left = wLeft + (window.innerWidth / 2) - (w / 2);
      var top = wTop + (window.innerHeight / 2) - (h / 2);
      return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
  }

  // window.onload = function () {
  //     <htm>document.getElementById('shareBtn').onclick = function () {
  //         var shareUrl = "http://www.facebook.com/sharer/sharer.php?u=http://www.chinahub.guru/question/1";
  //         popupwindow(shareUrl, 'facebook', 600, 400);
  //     }
  // }

  }


}
