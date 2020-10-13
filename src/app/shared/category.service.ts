import { Injectable } from '@angular/core';
import {  HttpHeaders, HttpClient } from '@angular/common/http';
import { Category } from './category.model';
import { Observable } from 'rxjs';
import {BaseAppUrl} from './_config/base-url';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getCategoryDetails():Observable<any>
  {
    //var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem("token")});
    return this.http.get<Category>(this.rootURL+'/Category');
  }
  createCategory(formData:Category)
  {
    return this.http.post(this.rootURL+'/Category',formData);
  }
  getCategoryByID(id:number):Observable<Category>
  {
    return this.http.get<Category>(this.rootURL+'/Category/'+id);
  }
  DeleteCategory(id:number)
  {
    return this.http.delete(this.rootURL+'/Category/'+id);
  }

}
