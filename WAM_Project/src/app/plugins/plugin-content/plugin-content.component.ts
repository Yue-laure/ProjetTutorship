import { Component } from '@angular/core';
import { CommonService } from "src/app/shared/common.service";
import { ActivatedRoute, Router } from "@angular/router";
import axios from 'axios';

@Component({
  selector: 'app-plugin-content',
  templateUrl: './plugin-content.component.html',
  styleUrls: ['./plugin-content.component.css']
})
export class PluginContentComponent {

    pluginsList:Array<any>=[];

    name!: String;
    thumbnail!: String;
    imgTable=new Map()
    constructor(public communSer:CommonService,public router:Router,public route:ActivatedRoute){}

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
          } )
    }

//click event for filscomponent  wimmics and burns-audio
tabEvent(index:number){
      let pathList=[' ','plugin-burns','plugin-wimmics'];
      this.router.navigate(['/plugin-content',pathList[index],
      ]);
    }  
  
  
  }
