import { Component ,Input} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { CommonService } from "../../shared/common.service";
@Component({
  selector: 'app-plugin-detail',
  templateUrl:    './plugin-detail.component.html', 
  // `             
  // <iframe [src]="safeUrl" frameborder="0"></iframe>
  //  ` ,
  styleUrls: ['./plugin-detail.component.css']
})
export class PluginDetailComponent {
  pluginsList:Array<any>=[];
 @Input() safeUrl!:SafeResourceUrl 
  constructor(public communSer:CommonService,private sanitizer:DomSanitizer){}

  async ngOnInit(){
    
  }

}