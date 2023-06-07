import { HttpClient, HttpEvent, HttpRequest, HttpParams, HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { ColumnItem, Plugins,PluginItem } from '../shared/data-types/commun.types';
import { CommonService } from '../shared/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})




export class UserProfileComponent implements OnInit {

  baseUrl = 'http://localhost:8010';
  constructor(private http: HttpClient, private authService:AuthService,private communSer:CommonService,private router:Router) { }
  files=Array<string>();
  username: string = '';
  buttonClicked = false;
  listOfData: Plugins[] =[]
  name!: String;
  thumbnail!: String;
  imgTable=new Map();
  ngOnInit(): void {
    this.authService.getUserName().subscribe(
      (    value: any) => {
         this.username = value;
         this.authService.setUsername(value);
       console.log(this.username) }
    );

    this.communSer.getPlugins().subscribe(
      (res)=>
      {

                if (res && res.length > 0) {
                  this.listOfData = res
                  console.log(this.listOfData );
                } else {
                  console.error("Invalid response from getPlugins API:", res);
                }
    })
    //obtenir le lien de image en utilisant un dictionnaire
    this.communSer.getPlugins().subscribe((res)=>
    {
      // this.pluginsList=res
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
  onFileUpload(event: any) {

   const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('url', 'http://localhost:8010/api/file');

   formData.append("username",this.username);

    this.http.post(this.baseUrl + '/api/file',
    formData).subscribe(
      response => console.log('Upload successful'),
      error => console.error(error)
    ); /*
    let url = this.baseUrl + '/api/file';
    fetch (url, {
      method : 'POST',
      body : formData
    }).then(response => {
      console.log(response);
}).catch(error => {
      console.log(error);
    }
); */
  }
  logout(){
    this.authService.logout();
  }
returnFiles(){
  return this.files;
}
getFiles(){
  this.buttonClicked = true;
 // this.authService.setUsername(this.username);
    this.authService.getUserFiles().subscribe(

      (response: any) => {
        if (response.length > 0) {
        for (let i = 0; i < response.length; i++) {

          this.files.push(response[i]);

        }
      }
      }
    );
  }

  SharePlugin(file:string){
    console.log(file);
  this.authService.sharePlugin(file);
}

deletePlugin(file:string){
  this.authService.deletePlugin(file);

}



// --------------------------------

listOfColumns: ColumnItem[] = [
  {
    name: 'Name',
    sortOrder: null,
    sortFn: (a: PluginItem, b: PluginItem) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [
    ],
    filterFn: (list: string[], item: PluginItem) => list.some(name => item.name.indexOf(name) !== -1)
  },
  {
    name: 'DirName',
    sortOrder: 'descend',
    sortFn: (a: PluginItem, b: PluginItem) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend', null],
    listOfFilter: [
      { text: 'WiMMICs', value:'^wimmics/[a-zA-Z0-9]*_?[a-zA-Z0-9]*'},
      { text: 'Burns', value:'^burns-audio/[a-zA-Z0-9]*_?[a-zA-Z0-9]*', byDefault: true }
    ],
    filterFn: null,
    filterMultiple: true
  },
  {
    name: 'Thumbnail',
    sortOrder: null,
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: PluginItem, b: PluginItem) => a.name.localeCompare(b.name),
    filterMultiple: false,
    listOfFilter: [
    ],
    filterFn: (thumbnail: string, item: PluginItem) => item.thumbnail.indexOf(thumbnail) !== -1
  },
  {
    name: 'Description',
    sortOrder: null,
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: PluginItem, b: PluginItem) => a.name.localeCompare(b.name),
    filterMultiple: false,
    listOfFilter: [
    ],
    filterFn: (description: string, item: PluginItem) => item.description.indexOf(description) !== -1
  }
];
// sauter a un plugin
  public goToPluginDetail(dirName: string){
    this.router.navigate(['/plugin-detail', dirName]);
       }


}

