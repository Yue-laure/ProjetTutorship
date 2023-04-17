import { Component ,Input} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-plugin-detail',
  templateUrl:    './plugin-detail.component.html', 
  styleUrls: ['./plugin-detail.component.css']
})
export class PluginDetailComponent {

 @Input() safeUrl!:SafeResourceUrl 
 
  constructor(private sanitizer:DomSanitizer){}

  async ngOnInit(){
    
  }

}