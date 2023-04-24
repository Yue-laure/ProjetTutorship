import { HttpClient } from '@angular/common/http';
import { MatMenuTrigger } from '@angular/material/menu';
import { Plugin } from './../../shared/data-types/commun.types';
import { Component ,Input, ViewChild} from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-plugin-detail',
  templateUrl:    './plugin-detail.component.html',
  styleUrls: ['./plugin-detail.component.css']
})
export class PluginDetailComponent {

  dirName!:string;
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  SafeUrl!: SafeUrl;
  url!: string;
  pluginInfo!:Plugin;

  onMenuItemClick() {
    this.menuTrigger.openMenu();
  }
  constructor(private sanitizer:DomSanitizer,public communSer:CommonService,private route: ActivatedRoute){
  }

  async ngOnInit(){
    this.dirName=this.route.snapshot.paramMap.get('dirName')!;

    this.communSer.getPlugins().subscribe(
      (res)=> {
        for (let index = 0; index < res.length; index++) {
          if(res[index].dirName==this.dirName)
              this.pluginInfo=res[index]
        }
      }
    )


    /** * partager au facebook et twitter
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
    window.onload =  () => {
          let dom1=<HTMLButtonElement>document.getElementById('shareBtnFaceBook')
          let dom2=<HTMLButtonElement>document.getElementById('shareBtnTwitter')
          dom1.onclick=  () => {
          var shareUrl = "http://www.facebook.com/sharer/sharer.php?u="+this.SafeUrl+"/question/1";
          // var shareUrl = "http://www.facebook.com/sharer/sharer.php?u=https://github.com/micbuffa/wam-community/question/1";
          popupwindow(shareUrl, 'facebook', 600, 400);
      }
      dom2.onclick= () => {
      //       var shareUrl = 'http://twitter.com/share?url=' + encodeURIComponent('https://github.com/micbuffa/wam-community') ;
      var shareUrl = 'http://twitter.com/share?url=' + encodeURIComponent(`${this.SafeUrl}`) ;
      popupwindow(shareUrl, 'facebook', 600, 400);
    }
  }
  }

  public getUrl(dirname: String) : String {
    this.url=`http://localhost:8010/${dirname}/index.js`
    return this.url;
  }
  public getSafeUrl(dirname: string): SafeUrl {
        const url = `http://localhost:8010/${dirname}/index.js`;
        const trimmedUrl = url?.trim();
        this.SafeUrl=this.sanitizer.bypassSecurityTrustUrl(url)
        return this.SafeUrl;
    }
  // public showUrlNotSecure(url:String): String {
  //     // this.toDisplay = !this.toDisplay;
  //     return url;
  //   }

}
