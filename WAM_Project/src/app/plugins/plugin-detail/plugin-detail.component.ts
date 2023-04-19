import { Component ,Input} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-plugin-detail',
  templateUrl:    './plugin-detail.component.html',
  styleUrls: ['./plugin-detail.component.css']
})
export class PluginDetailComponent {

 @Input() safeUrl!:SafeResourceUrl

  constructor(private sanitizer:DomSanitizer,public communSer:CommonService){}

  async ngOnInit(){
    this.communSer.getPlugins().then(async (res)=>{


      for (let index = 0; index < res.plugins.length; index++) {
        var item=res.plugins[index]
        // if(item.dirName==this.safeUrl)
      //   {
      //     this.wimmicsTable.set(item.name,"http://localhost:8010/"+item.dirName+"/index.html")
      //     this.wimmicsList.push(item)
      //   }
      }
   })
    // console.log(this.safeUrl);
    // const url=this.safeUrl.toString();
    // url.split("http://localhost:8010/")
    // // console.log(url.substring(4));
    // let s1=url.split("/index.html")
    // s1.splice(22)
    // console.log(s1);




  }

}
