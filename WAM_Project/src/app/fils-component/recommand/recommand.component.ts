import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonService } from "../../shared/common.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-recommand',
  templateUrl: './recommand.component.html',
  styleUrls: ['./recommand.component.css']
})
export class RecommandComponent {
  pluginsList:Array<any>=[];
  recommandsList:Array<any>=[];
  @ViewChild('mgFrame')
  myFrame!: ElementRef;
  constructor(public  route:ActivatedRoute,public comSer:CommonService){}

  ngOnInit(){
      // this.comSer.getRecommandPlugins().then((res)=>{
      //         console.log(res)
      //         return res
            // for (let index = 0; index< res.length; index++){
            //   this.recommandsList.push(this.comSer.getPluginByDirName(res[index]))
            // }
      // })
      // return this.recommandsList
  
      this.comSer.getPluginByDirName().then((res)=>{
        console.log(res.data)
          const doc =this.myFrame.nativeElement.contentWindow.document;
          doc.open();
          doc.write(res.data);
          doc.close();
      })
  }

}
