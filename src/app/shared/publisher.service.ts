import { Injectable } from '@angular/core';
import { BaseAppUrl } from './_config/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publisher } from './publisher.model';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getPublisherDetails():Observable<any>
  {
    return this.http.get<Publisher>(this.rootURL+'/Publisher');
  }
  createPublisherDetails(formData:Publisher)
  {
    console.log(formData);
    return this.http.post(this.rootURL+'/Publisher',formData);
  }
  getPublisherDetailsByID(id:number):Observable<Publisher>
  {
    return this.http.get<Publisher>(this.rootURL+'/Publisher/'+id);
  }
  DeletePublisherDetails(id:number)
  {
    return this.http.delete(this.rootURL+'/Publisher/'+id);
  }
}
