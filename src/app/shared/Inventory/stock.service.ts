import { Injectable } from '@angular/core';
import { BaseAppUrl } from '../_config/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from './stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getStockDetails():Observable<any>
  {
    return this.http.get<Stock>(this.rootURL+'/Stock');
  }
  createStockDetails(formData:Stock)
  {
    
    return this.http.post(this.rootURL+'/Stock',formData);
  }
  getStockDetailsByID(id:number):Observable<Stock>
  {
    return this.http.get<Stock>(this.rootURL+'/Stock/'+id);
  }
  DeleteStockDetails(id:number)
  {
    return this.http.delete(this.rootURL+'/Stock/'+id);
  }
}
