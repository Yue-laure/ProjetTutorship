import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PluginActionService {

  constructor(private http:HttpClient) { }

  //get date
  fetchData(){
    const token=localStorage.getItem('itcast-token')
    return this.http.get(`http://localhost:8010/api/plugins`,{
      headers:{
        Authorization:`Baerer ${token}`
      }
    })
  }
  // getPlugins(): Observable<Plugins[]> {
  //   return this.getDoc().pipe(
  //     map((res: { docs: Plugins[] }) => res.docs)
  //   );
  // }
}
