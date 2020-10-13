import { Injectable } from '@angular/core';
import { BaseAppUrl } from './_config/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subcategory } from './subcategory.model';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getSubCategoryDetails():Observable<any>
  {
    return this.http.get<Subcategory>(this.rootURL+'/SubCategory');
  }
  createSubCategory(formData:Subcategory)
  {
    console.log(formData);
    return this.http.post(this.rootURL+'/SubCategory',formData);
  }
  getSubCategoryByID(id:number):Observable<Subcategory>
  {
    return this.http.get<Subcategory>(this.rootURL+'/SubCategory/'+id);
  }
  DeleteSubCategory(id:number)
  {
    return this.http.delete(this.rootURL+'/SubCategory/'+id);
  }
}
