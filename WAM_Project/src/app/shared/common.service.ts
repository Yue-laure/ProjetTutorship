import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doc, Plugins } from '../shared/data-types/commun.types';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  host='http://localhost:8010';

  constructor(private http: HttpClient) { }

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
}
