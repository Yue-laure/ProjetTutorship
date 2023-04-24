import { Plugins, Doc } from './../../shared/data-types/commun.types';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { CommonService } from "../../shared/common.service";
import { HttpClient } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import { merge, tap } from 'rxjs';
import { Router } from '@angular/router';
import { PluginActionService } from 'src/app/shared/plugin.action.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('url',{static:true}) url!:ElementRef ;
  pluginsList:Array<any>=[];

  safeUrl!: SafeResourceUrl;
  name!: String;
  thumbnail!: String;
  imgTable=new Map();
  toDisplay!: boolean;

  constructor(public communSer:CommonService,public actionSer:PluginActionService,private router:Router,private http: HttpClient,private sanitizer: DomSanitizer){}

  dataSource:Plugins[]=[]
  dataSource_length!:number
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  ngOnInit(){

      // 5 plugins par pageactionSer
      this.actionSer.fetchData().subscribe(res=>{
        console.log(res);
      })
      this.communSer.getPlugins().subscribe(
        (res)=>
        {
                  if (res && res.length > 0) {
                    this.dataSource = res.slice(0, 5);
                    this.dataSource_length = res.length;
                  } else {
                    console.error("Invalid response from getPlugins API:", res);
                  }
      }
      )

      //obtenir le lien de image en utilisant un dictionnaire
      this.communSer.getPlugins().subscribe((res)=>
          {
            this.pluginsList=res
            for (let index = 0; index < res.length; index++) {
              let httpUrl=this.communSer.host+'/'+res[index].dirName+'/descriptor.json'
              // this.http.get(httpUrl).subscribe((res)=>{
              //   console.log(res);
              // })
              this.name=res[index].name
              if (res[index].thumbnail)
               {
                //result.data.thumbnail est screenshot.png ou default.png
                if (res[index].thumbnail=="screenshot.png")
                {
                  this.thumbnail=this.communSer.host+'/'+res[index].dirName+'/screenshot.png'
                  }
                else
                {
                  this.thumbnail=this.communSer.host+'/'+res[index].dirName+'/default.png'
                  }
                this.imgTable.set(this.name,this.thumbnail)
              }
              // result.data.thumbnail est vide
              else if (res[index].thumbnail=="")
              {
                this.thumbnail=this.communSer.host+'/'+res[index].dirName+'/default.png'
                this.imgTable.set(this.name,this.thumbnail)
                }
            }
              // console.log(this.imgTable)
              return this.imgTable
          } )
    }

  // pagenation
  displayedColumns: string[] = ['id','name', 'dirName', 'description','thumbnail','Action'];
  ngAfterViewInit(): void {
          // throw new Error('Method not implemented.');
          if (this.paginator) {
            merge(this.paginator.page)
              .pipe(
                tap(() => this.next_page())
              )
              .subscribe();
          }
        }
  // next page
  next_page():void{
          this.communSer.getPlugins().subscribe((res)=>
              {         console.log(this.paginator.pageIndex);
                        console.log(this.paginator.pageSize);
                        this.dataSource=res
                        this.dataSource=this.dataSource.slice(this.paginator.pageIndex*this.paginator.pageSize,
                                                              this.paginator.pageIndex*this.paginator.pageSize+this.paginator.pageSize)
            }
              )
        }
  // sauter a un plugin
  public goToPluginDetail(dirName: string){
     this.router.navigate(['/plugin-detail', dirName]);
        }
  // public getUrl(dirname: String) : String {
  //     return `http://localhost:8010/${dirname}/index.js`;
  //   }
  // public getSafeUrl(dirname: string): SafeUrl {
  //       const url = `http://localhost:8010/${dirname}/index.js`;
  //       const trimmedUrl = url?.trim();
  //       return this.sanitizer.bypassSecurityTrustUrl(url);
  //   }
  // public showUrl(url: string): SafeResourceUrl {
  //     // console.log(url);
  //     this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  //     return this.safeUrl
  //   }
  // public showUrlNotSecure(url:String): String {
  //     this.toDisplay = !this.toDisplay;
  //     return url;
  //   }

}
