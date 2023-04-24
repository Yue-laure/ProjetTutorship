import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-plugin-wimmics',
  templateUrl: './plugin-wimmics.component.html',
  styleUrls: ['./plugin-wimmics.component.css']
})
export class PluginWimmicsComponent {
  wimmicsList:Array<any>=[];
  wimmicsTable=new Map();
  safeUrl!: SafeResourceUrl;
  toDisplay!: boolean;
  constructor(public communSer:CommonService,private sanitizer: DomSanitizer){}

  async ngOnInit(){
  //   this.communSer.getPlugins().then(async (res)=>{
  //     for (let index = 0; index < res.plugins.length; index++) {
  //       var item=res.plugins[index]
  //       if(item.dirName.match('^wimmics/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'))
  //       {
  //         this.wimmicsTable.set(item.name,"http://localhost:8010/"+item.dirName+"/index.html")
  //         this.wimmicsList.push(item)
  //       }
  //     }
  //  })
  // //  console.log( this.wimmicsList)
  // //  console.log( this.wimmicsTable)

   }
   public getSafeUrl(dirname: string): SafeUrl {
    const url = `http://localhost:8010/${dirname}/index.html`;
    const trimmedUrl = url?.trim();
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  public showUrl(url: string): SafeResourceUrl {
    // console.log(url);
    this.toDisplay = true;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return this.safeUrl
  }

}
