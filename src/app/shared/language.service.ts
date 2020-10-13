import { Injectable } from '@angular/core';
import { BaseAppUrl } from './_config/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Language } from './language.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getLanguageDetails():Observable<any>
  {
    return this.http.get<Language>(this.rootURL+'/Language');
  }
  createLanguageDetails(formData:Language)
  {
    console.log(formData);
    return this.http.post(this.rootURL+'/Language',formData);
  }
  getLanguageDetailsByID(id:number):Observable<Language>
  {
    return this.http.get<Language>(this.rootURL+'/Language/'+id);
  }
  DeleteLanguageDetails(id:number)
  {
    return this.http.delete(this.rootURL+'/Language/'+id);
  }
}
