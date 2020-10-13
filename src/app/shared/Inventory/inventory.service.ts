import { Injectable } from '@angular/core';
import { BaseAppUrl } from '../_config/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from './inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getInventoryDetails():Observable<any>
  {
    return this.http.get<Inventory>(this.rootURL+'/Inventory');
  }
  createInventory(formData:Inventory)
  {
    return this.http.post(this.rootURL+'/Inventory',formData);
  }
  getInventoryByID(id:number):Observable<Inventory>
  {
    return this.http.get<Inventory>(this.rootURL+'/Inventory/'+id);
  }
  DeleteInventory(id:number)
  {
    return this.http.delete(this.rootURL+'/Inventory/'+id);
  }
  GetInventoryByStockID(id:number):Observable<Inventory>
  {
    return this.http.get<Inventory>(this.rootURL+'/Inventory/GetInventoryByStockID?id='+id);
  }
}
