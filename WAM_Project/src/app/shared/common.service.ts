import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

     host='http://localhost:8010';
     pluginsList:Array<any>=[];
     burnsList:Array<any>=[];
     wimmicsList:Array<any>=[];
     othersList:Array<any>=[];
     imgList:Array<any>=[];
     name!: String;
     thumbnai!: String;
    constructor(){};

    async getPlugins(){
      let httpUrl=this.host+ `/api/plugins`;
      let  result=await axios.get(httpUrl);
      // console.log(result.data);
      // console.log(result.data.plugins);
     return result.data;
    }

    async getRecommandPlugins(){
      this.getPlugins().then((res)=>{
        for (let index = 0; index< res.plugins.length; index++) {
                  if (res.plugins[index].dirName.match('^burns-audio/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'))
                    this.pluginsList.push(res.plugins[index].dirName.replace('burns-audio',''))
                  else if  (res.plugins[index].dirName.match('^wimmics/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'))
                    this.pluginsList.push(res.plugins[index].dirName.replace('wimmics',''))
                  else
                    this.pluginsList.push(res.plugins[index].dirName)
            }
            // console.log(this.pluginsList)
            return  this.pluginsList
      })
    }

    async getBurnsPlugins(){
      this.getPlugins().then((res)=>{
        for (let index = 0; index< res.plugins.length; index++) {
                  if (res.plugins[index].dirName.match('^burns-audio/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'))
                    this.burnsList.push(res.plugins[index].dirName.replace('burns-audio',''))
                  else if  (res.plugins[index].dirName.match('^wimmics/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'))
                    this.wimmicsList.push(res.plugins[index].dirName.replace('wimmics',''))
                  else
                    this.othersList.push(res.plugins[index].dirName)
            }
      })
      console.log(this.burnsList)
      return this.burnsList
  }
   
   async getWimmicsPlugins(){
      this.getPlugins().then((res)=>{
        for (let index = 0; index< res.plugins.length; index++) {
                  if (res.plugins[index].dirName.match('^burns-audio/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'))
                    this.burnsList.push(res.plugins[index].dirName.replace('burns-audio',''))
                  else if  (res.plugins[index].dirName.match('^wimmics/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'))
                    this.wimmicsList.push(res.plugins[index].dirName.replace('wimmics',''))
                  else
                    this.othersList.push(res.plugins[index].dirName)
            }
      })
     console.log(this.wimmicsList)
      return this.wimmicsList
    }
  }