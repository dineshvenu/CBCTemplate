import { Injectable } from '@angular/core';
import { BaseAppUrl } from './_config/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getCompanyDetails():Observable<any>
  {
    return this.http.get<Company>(this.rootURL+'/Company');
  }
  createCompanyDetails(formData:Company)
  {
    console.log(formData);
    return this.http.post(this.rootURL+'/Company',formData);
  }
  getCompanyDetailsByID(id:number):Observable<Company>
  {
    return this.http.get<Company>(this.rootURL+'/Company/'+id);
  }
  DeleteCompanyDetails(id:number)
  {
    return this.http.delete(this.rootURL+'/Company/'+id);
  }
}
