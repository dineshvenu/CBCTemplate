import { Injectable } from '@angular/core';
import { BaseAppUrl } from 'src/app/shared/_config/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkSchedul } from './work-schedul.model';

@Injectable({
  providedIn: 'root'
})
export class WorkscheduleService {
  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getWorkSchedul():Observable<any>
  {
    return this.http.get<WorkSchedul>(this.rootURL+'/WorkSchedule');
  }
  createWorkSchedul(formData:WorkSchedul)
  {
    console.log(formData);
    return this.http.post(this.rootURL+'/WorkSchedule',formData);
  }
  getWorkSchedulByID(id:number):Observable<WorkSchedul>
  {
    return this.http.get<WorkSchedul>(this.rootURL+'/WorkSchedule/'+id);
  }
  DeleteWorkSchedul(id:number)
  {
    return this.http.delete(this.rootURL+'/WorkSchedule/'+id);
  }
}
