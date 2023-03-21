import { Component } from '@angular/core';
import axios from 'axios';

import { CommonService } from "../../shared/common.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    constructor(public common:CommonService){}

    public list:any[]=[];

    async ngOnInit(){
        let httpUrl="https://webaudiomodules.org/repository.json"
        let result=await axios.get(httpUrl);
        console.log(result.data.plugs)
        for (let index = 0; index< result.data.plugs.length; index++){
                   this.list.push(result.data.plugs[index])   
                   console.log(result.data.plugs[index])
                   console.log(result.data.plugs)
        }

        // console.log(result.data.plugs)
        console.log(this.list)
       this.list= result.data.plugs
        return  result.data.plugs
      
        }        


    
      }
