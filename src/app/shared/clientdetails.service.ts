import { Injectable } from '@angular/core';
import { BaseAppUrl } from './_config/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientDetails } from './client-details.model';

@Injectable({
  providedIn: 'root'
})
export class ClientdetailsService {
  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getClientDetails():Observable<any>
  {
    return this.http.get<ClientDetails>(this.rootURL+'/ClientDetailss');
  }
  createClientDetails(formData:ClientDetails)
  {
    console.log(formData);
    return this.http.post(this.rootURL+'/ClientDetailss',formData);
  }
  getClientDetailsByID(id:number):Observable<ClientDetails>
  {
    return this.http.get<ClientDetails>(this.rootURL+'/ClientDetailss/'+id);
  }
  DeleteClientDetails(id:number)
  {
    return this.http.delete(this.rootURL+'/ClientDetailss/'+id);
  }
}
