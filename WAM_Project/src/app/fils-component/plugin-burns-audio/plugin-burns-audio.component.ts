import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-plugin-burns-audio',
  templateUrl: './plugin-burns-audio.component.html',
  styleUrls: ['./plugin-burns-audio.component.css']
})
export class PluginBurnsAudioComponent {
  burnsList:Array<any>=[];
  burnsTable=new Map();
  safeUrl!: SafeResourceUrl;
  toDisplay!: boolean;

  constructor(public communSer:CommonService,private sanitizer: DomSanitizer){}

  async ngOnInit(){
    // this.communSer.getPlugins().then(async (res)=>{
    //   for (let index = 0; index < res.plugins.length; index++) {
    //     var item=res.plugins[index]
    //     if(item.dirName.match('^burns-audio/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'))
    //     {
    //       this.burnsTable.set(item.name,"http://localhost:8010/"+item.dirName+"/index.html")
    //       this.burnsList.push(item)
    //     }
    //     else
    //      continue
    // }
    // })
    // // console.log( this.burnsList)
    // // console.log( this.burnsTable)
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
