import { Injectable } from '@angular/core';
import { BaseAppUrl } from './_config/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unit } from './unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getUnitDetails():Observable<any>
  {
    return this.http.get<Unit>(this.rootURL+'/Unit');
  }
  createUnit(formData:Unit)
  {
    console.log(formData);
    return this.http.post(this.rootURL+'/Unit',formData);
  }
  getUnitByID(id:number):Observable<Unit>
  {
    return this.http.get<Unit>(this.rootURL+'/Unit/'+id);
  }
  DeleteUnit(id:number)
  {
    return this.http.delete(this.rootURL+'/Unit/'+id);
  }
}
