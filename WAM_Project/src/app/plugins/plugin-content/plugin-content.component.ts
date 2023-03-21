import { isNgTemplate } from '@angular/compiler';
import { Component } from '@angular/core';
import { CommonService } from "src/app/shared/common.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-plugin-content',
  templateUrl: './plugin-content.component.html',
  styleUrls: ['./plugin-content.component.css']
})
export class PluginContentComponent {

    pluginsList:Array<any>=[];

    constructor(public communSer:CommonService,public router:Router,public route:ActivatedRoute){}

    ngOnInit(){
        //'https://wasabi.i3s.unice.fr/WebAudioPluginBank/'
        this.communSer.getPlugins().then((res)=>{
            //object dans object  n est pas stable ,si il n affiche pas ,utiliser les codes suivants
            // for (let index = 0; index < res.plugins.length; index++) {
            //   this.pluginsList.push(res.plugins[index])
            // }
            this.pluginsList=res.plugins
            // console.log(this.pluginsList)
            return this.pluginsList;
          } )
    }

//click event for filscomponent  wimmics and burns-audio
tabEvent(index:number){
      let pathList=[' ','plugin-burns','plugin-wimmics'];
      this.router.navigate(['/plugin-content',pathList[index],
      ]);
    }  
  
  
  }
