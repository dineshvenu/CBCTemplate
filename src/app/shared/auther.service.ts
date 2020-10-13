import { Injectable } from '@angular/core';
import { BaseAppUrl } from './_config/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auther } from './auther.model';

@Injectable({
  providedIn: 'root'
})
export class AutherService {
  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getAutherDetails():Observable<any>
  {
    return this.http.get<Auther>(this.rootURL+'/Auther');
  }
  createAutherDetails(formData:Auther)
  {
    
    return this.http.post(this.rootURL+'/Auther',formData);
  }
  getAutherDetailsByID(id:number):Observable<Auther>
  {
    return this.http.get<Auther>(this.rootURL+'/Auther/'+id);
  }
  DeleteAutherDetails(id:number)
  {
    return this.http.delete(this.rootURL+'/Auther/'+id);
  }
}
