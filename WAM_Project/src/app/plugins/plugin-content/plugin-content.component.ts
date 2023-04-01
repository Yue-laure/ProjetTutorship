import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonService } from "src/app/shared/common.service";
import { ActivatedRoute, Router } from "@angular/router";
import axios from 'axios';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-plugin-content',
  templateUrl: './plugin-content.component.html',
  styleUrls: ['./plugin-content.component.css']
})
export class PluginContentComponent {
  @ViewChild('url',{static:true}) url!:ElementRef ;
    pluginsList:Array<any>=[];
    safeUrl!: SafeResourceUrl;
    name!: String;
    thumbnail!: String;
    imgTable=new Map();
    toDisplay!: boolean;
    // toDisplay=true;
    constructor(public communSer:CommonService,public router:Router,public route:ActivatedRoute, private sanitizer: DomSanitizer){}

    ngOnInit(){
      //obtenir le lien de image en utilisant un dictionnaire 
        this.communSer.getPlugins().then(async (res)=>{
            //object dans object  n est pas stable ,si il n affiche pas ,utiliser les codes suivants
            // for (let index = 0; index < res.plugins.length; index++) {
            //   this.pluginsList.push(res.plugins[index])
            // }
            this.pluginsList=res.plugins
            for (let index = 0; index < res.plugins.length; index++) {
              let httpUrl=this.communSer.host+'/'+res.plugins[index].dirName+'/descriptor.json'
              let  result=await axios.get(httpUrl);
              this.name=result.data.name
              if (result.data.thumbnail)
               {
                if (result.data.thumbnail=="screenshot.png")
                  this.thumbnail=this.communSer.host+'/'+res.plugins[index].dirName+'/screenshot.png'
                else
                this.thumbnail=this.communSer.host+'/'+res.plugins[index].dirName+'/default.png'
                this.imgTable.set(this.name,this.thumbnail)
              }
              else
                console.log("image est vide"+result.data.thumbnail)
                continue
              }
              // console.log(this.imgTable)
              return this.imgTable
          } )

        
    }

//click event for filscomponent  wimmics and burns-audio
tabEvent(index:number){
      let pathList=[' ','plugin-burns','plugin-wimmics'];
      this.router.navigate(['/plugin-content',pathList[index],
      ]);
    }  
  
    public getSafeUrl(dirname: string): SafeUrl {
      const url = `http://localhost:8010/${dirname}/index.html`;
      const trimmedUrl = url?.trim();
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }
    public showUrl(url: string): SafeResourceUrl {
      console.log(url);
      // this.toDisplay = !this.toDisplay;
      this.toDisplay = true;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      return this.safeUrl
    }
   }
  
  
