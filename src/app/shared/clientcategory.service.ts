import { Injectable } from '@angular/core';
import { BaseAppUrl } from './_config/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clientcategory } from './clientcategory.model';

@Injectable({
  providedIn: 'root'
})
export class ClientcategoryService {
  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }


  
  getClientCategoryDetails():Observable<any>
  {
    return this.http.get<Clientcategory>(this.rootURL+'/ClientCategory');
  }
  createClientCategory(formData:Clientcategory)
  {
    console.log(formData);
    return this.http.post(this.rootURL+'/ClientCategory',formData);
  }
  getClientCategoryByID(id:number):Observable<Clientcategory>
  {
    return this.http.get<Clientcategory>(this.rootURL+'/ClientCategory/'+id);
  }
  DeleteClientCategory(id:number)
  {
    return this.http.delete(this.rootURL+'/ClientCategory/'+id);
  }
}
