import { Injectable } from '@angular/core';
import { BaseAppUrl } from './_config/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cover } from './cover.model';

@Injectable({
  providedIn: 'root'
})
export class CoverService {
  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getCoverDetails():Observable<any>
  {
    return this.http.get<Cover>(this.rootURL+'/Cover');
  }
  createCoverDetails(formData:Cover)
  {
    console.log(formData);
    return this.http.post(this.rootURL+'/Cover',formData);
  }
  getCoverDetailsByID(id:number):Observable<Cover>
  {
    return this.http.get<Cover>(this.rootURL+'/Cover/'+id);
  }
  DeleteCoverDetails(id:number)
  {
    return this.http.delete(this.rootURL+'/Cover/'+id);
  }
}
