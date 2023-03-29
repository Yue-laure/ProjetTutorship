import { Component, ElementRef, Input, OnInit,ViewChild } from '@angular/core';
import { CommonService } from "../../shared/common.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-recommand',
  templateUrl: './recommand.component.html',
  styleUrls: ['./recommand.component.css']
})
export class RecommandComponent implements OnInit{
  @Input() pluginsList:any;
  recommandsList:Array<any>=[];

  constructor(public  route:ActivatedRoute,public comSer:CommonService){}

  ngOnInit(){

    // console.log(this.pluginsList)
      this.comSer.getRecommandPlugins().then((res)=>{
              // console.log(res)
              return res
            // for (let index = 0; index< res.length; index++){
            //   this.recommandsList.push(this.comSer.getPluginByDirName(res[index]))
            // }
      })
  //     return this.recommandsList
  //     this.comSer.getPluginByDirName(__dirname).then((res)=>{
  //       console.log(res.data)
  //     })
  }

}
