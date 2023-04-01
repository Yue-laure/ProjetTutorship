import { Component } from '@angular/core';
import { UrlSegment } from '@angular/router';
import axios from 'axios';

import { CommonService } from "../../shared/common.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    constructor(public communSer:CommonService,){}

    pluginsList:Array<any>=[];

    async ngOnInit(){
      this.communSer.getPlugins().then(async (res)=>{
        //object dans object  n est pas stable ,si il n affiche pas ,utiliser les codes suivants
        // for (let index = 0; index < res.plugins.length; index++) {
        //   this.pluginsList.push(res.plugins[index])
        // }
        this.pluginsList=res.plugins
        for (let index = 0; index < res.plugins.length; index++) {
          var item=this.pluginsList[index]
          if(item.dirName.match('^wimmics/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'))
           var pluginUrl ="http://localhost:8010/"+item.dirName+"/index.html"
           else
           var pluginUrl ="http://localhost:8010/"+item.dirName+"/index.js"

          console.log(pluginUrl)
          
      }
      })
      
        }        


    
      }
