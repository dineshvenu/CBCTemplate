import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseAppUrl } from 'src/app/shared/_config/base-url';
import { Purchase } from './purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getPurchaseDetails():Observable<any>
  {
    return this.http.get<Purchase>(this.rootURL+'/Purchase');
  }
  createPurchaseDetails(formData:Purchase)
  {
    return this.http.post(this.rootURL+'/Purchase',formData);
  }
  getPurchaseDetailsByID(id:number):Observable<Purchase>
  {
    return this.http.get<Purchase>(this.rootURL+'/Purchase/'+id);
  }
  DeletePurchaseDetails(id:number)
  {
    return this.http.delete(this.rootURL+'/Purchase/'+id);
  }
}
