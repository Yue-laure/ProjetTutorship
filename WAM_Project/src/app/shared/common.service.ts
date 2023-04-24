import { Injectable } from '@angular/core';
import { Plugins, Doc } from './data-types/commun.types';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { Observable} from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

     host='http://localhost:8010';
     pluginsList!:Plugins[];
     burnsList:Array<any>=[];
     wimmicsList:Array<any>=[];
     othersList:Array<any>=[];
     imgList:Array<any>=[];
     name!: String;
     thumbnai!: String;
     doc!: Doc;
    // constructor(){};
    constructor(private http: HttpClient){};

    getDoc():Observable<Doc>{
      let httpUrl=this.host+ `/api/plugins`;
      // console.log(this.http.get<Doc>(httpUrl));

     return this.http.get<Doc>(httpUrl)
    }
    getPlugins(): Observable<Plugins[]> {
      return this.getDoc().pipe(
        map((res: { docs: Plugins[] }) => res.docs)
      );
    }
    async getRecommandPlugins(){
      // this.getPlugins().subscribe((res)=>{
      //   this.pluginsList=res
      //   for (let index = 0; index< res.plugins.length; index++) {
      //             if (res.plugins[index].dirName.match('^burns-audio/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'))
      //               this.pluginsList.push(res.plugins[index].dirName.replace('burns-audio',''))
      //             else if  (res.plugins[index].dirName.match('^wimmics/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'))
      //               this.pluginsList.push(res.plugins[index].dirName.replace('wimmics',''))
      //             else
      //               this.pluginsList.push(res.plugins[index].dirName)
      //       }
      //       // console.log(this.pluginsList)
      //       return  this.pluginsList
      // })

        // console.log(this.pluginsList);

      //   this.getPlugins().subscribe((res)=>{
      //   this.pluginsList=res
      //   for (let index = 0; index< res.plugins.length; index++) {
      //             if (res.plugins[index].dirName.match('^burns-audio/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'))
      //               this.pluginsList.push(res.plugins[index].dirName.replace('burns-audio',''))
      //             else if  (res.plugins[index].dirName.match('^wimmics/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'))
      //               this.pluginsList.push(res.plugins[index].dirName.replace('wimmics',''))
      //             else
      //               this.pluginsList.push(res.plugins[index].dirName)
      //       }
      //       // console.log(this.pluginsList)
      //       return  this.pluginsList
      // })
    }

    async getBurnsPlugins(){
      // this.getPlugins().then((res)=>{
      //   for (let index = 0; index< res.plugins.length; index++) {
      //             if (res.plugins[index].dirName.match('^burns-audio/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'))
      //               this.burnsList.push(res.plugins[index].dirName.replace('burns-audio',''))
      //             else if  (res.plugins[index].dirName.match('^wimmics/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'))
      //               this.wimmicsList.push(res.plugins[index].dirName.replace('wimmics',''))
      //             else
      //               this.othersList.push(res.plugins[index].dirName)
      //       }
      // })
      // console.log(this.burnsList)
      return this.burnsList
  }

   async getWimmicsPlugins(){
    //   this.getPlugins().then((res)=>{
    //     for (let index = 0; index< res.plugins.length; index++) {
    //               if (res.plugins[index].dirName.match('^burns-audio/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'))
    //                 this.burnsList.push(res.plugins[index].dirName.replace('burns-audio',''))
    //               else if  (res.plugins[index].dirName.match('^wimmics/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'))
    //                 this.wimmicsList.push(res.plugins[index].dirName.replace('wimmics',''))
    //               else
    //                 this.othersList.push(res.plugins[index].dirName)
    //         }
    //   })
    //  console.log(this.wimmicsList)
    //   return this.wimmicsList
    }
  }
