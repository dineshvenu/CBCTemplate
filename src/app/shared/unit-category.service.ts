import { Injectable } from '@angular/core';
import { BaseAppUrl } from './_config/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnitCategory } from './unit-category.model';

@Injectable({
  providedIn: 'root'
})
export class UnitCategoryService {
  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getUnitCategoryDetails():Observable<any>
  {
    return this.http.get<UnitCategory>(this.rootURL+'/UnitCategory');
  }
  createUnitCategory(formData:UnitCategory)
  {
    console.log(formData);
    return this.http.post(this.rootURL+'/UnitCategory',formData);
  }
  getUnitCategoryByID(id:number):Observable<UnitCategory>
  {
    return this.http.get<UnitCategory>(this.rootURL+'/UnitCategory/'+id);
  }
  DeleteUnitCategory(id:number)
  {
    return this.http.delete(this.rootURL+'/UnitCategory/'+id);
  }
}
