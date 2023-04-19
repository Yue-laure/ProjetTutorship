import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import axios from 'axios';
import { CommonService } from "../../shared/common.service";
// ­­import { WamHost } from "../../../assets/wamHost/wamHost.js"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    @ViewChild('url',{static:true}) url!:ElementRef ;
    pluginsList:Array<any>=[];
    safeUrl!: SafeResourceUrl;
    name!: String;
    thumbnail!: String;
    imgTable=new Map();
    toDisplay!: boolean;
    constructor(public communSer:CommonService,private sanitizer: DomSanitizer){}

    async ngOnInit(){
      this.communSer.getPlugins().then(async (res)=>{
        //object dans object  n est pas stable ,si il n affiche pas ,utiliser les codes suivants
        // for (let index = 0; index < res.plugins.length; index++) {
        //   this.pluginsList.push(res.plugins[index])
        // }
        this.pluginsList=res.plugins
        for (let index = 0; index < res.plugins.length; index++) {
          var item=this.pluginsList[index]
          if("http://localhost:8010/"+item.dirName+"/index.html")
           var pluginUrl ="http://localhost:8010/"+item.dirName+"/index.html"
           else
           var pluginUrl ="please make sure index.html in the repo of plugins "
      }
      })
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
                {
                  this.thumbnail=this.communSer.host+'/'+res.plugins[index].dirName+'/screenshot.png'
                  }
                else
                {
                  this.thumbnail=this.communSer.host+'/'+res.plugins[index].dirName+'/default.png'
                  }
                this.imgTable.set(this.name,this.thumbnail)
              }
              // result.data.thumbnail est vide
              else if (result.data.thumbnail=="")
              {
                this.thumbnail=this.communSer.host+'/'+res.plugins[index].dirName+'/default.png'
                this.imgTable.set(this.name,this.thumbnail)
                }
            }
              // console.log(this.imgTable)
              return this.imgTable
          } )
        }


    public getUrl(dirname: String) : String {
      return `http://localhost:8010/${dirname}/index.js`;
    }

    public getSafeUrl(dirname: string): SafeUrl {
        const url = `http://localhost:8010/${dirname}/index.js`;

        const trimmedUrl = url?.trim();
        return this.sanitizer.bypassSecurityTrustUrl(url);

    }
    public showUrl(url: string): SafeResourceUrl {
      // console.log(url);
      // this.toDisplay = !this.toDisplay;
      this.toDisplay = true;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      return this.safeUrl
    }

    public showUrlNotSecure(url:String): String {
      this.toDisplay = !this.toDisplay;
      return url;
    }

  }
