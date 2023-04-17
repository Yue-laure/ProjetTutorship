import { Component, ViewChild } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'WAM_Project';
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  onMenuItemClick() {
    this.menuTrigger.openMenu();
  }
  constructor( public router:Router,public route:ActivatedRoute,  ){}

  ngOnInit(){
      /** * partager au facebook
       * @param url
       * @param title「null」
       * @param w
       * @param h
       * @returns {Window}
       */
       function popupwindow(url: string , title: string | undefined, w:  number, h: number) {
        let wLeft:number
        let wTop:number
        wLeft = window.screenLeft ? window.screenLeft : window.screenX;
        wTop = window.screenTop ? window.screenTop : window.screenY;

        var left = wLeft + (window.innerWidth / 2) - (w / 2);
        var top = wTop + (window.innerHeight / 2) - (h / 2);
        return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    }
    window.onload = function () {
            let dom1=<HTMLButtonElement>document.getElementById('shareBtnFaceBook')
            let dom2=<HTMLButtonElement>document.getElementById('shareBtnTwitter')
            dom1.onclick= function () {
            var shareUrl = "http://www.facebook.com/sharer/sharer.php?u=https://github.com/micbuffa/wam-community/question/1";
            popupwindow(shareUrl, 'facebook', 600, 400);
        }
        dom2.onclick= function () {
          var shareUrl = 'http://twitter.com/share?url=' + encodeURIComponent('https://github.com/micbuffa/wam-community') ;
          popupwindow(shareUrl, 'facebook', 600, 400);
      }
    }

  }

//click event for filscomponent  wimmics and burns-audio
tabEvent(index:number){
  let pathList=[' ','plugin-burns','plugin-wimmics'];
  // this.router.navigate(['/home',pathList[index],
  this.router.navigate([pathList[index],
  ]);
}  
}
