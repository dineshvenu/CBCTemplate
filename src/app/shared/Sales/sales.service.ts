import { Injectable } from '@angular/core';
import { BaseAppUrl } from '../_config/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sales } from './sales.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getSalesDetails():Observable<any>
  {
    return this.http.get<Sales>(this.rootURL+'/Sales');
  }
  createSalesDetails(formData:Sales)
  {
    return this.http.post(this.rootURL+'/Sales',formData);
  }
  getSalesDetailsByID(id:number):Observable<Sales>
  {
    return this.http.get<Sales>(this.rootURL+'/Sales/'+id);
  }
  DeleteSalesDetails(id:number)
  {
    return this.http.delete(this.rootURL+'/Sales/'+id);
  }
}
