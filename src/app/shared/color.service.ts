import { Injectable } from '@angular/core';
import { BaseAppUrl } from './_config/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color } from './color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getColorDetails():Observable<any>
  {
    return this.http.get<Color>(this.rootURL+'/Color');
  }
  createColorDetails(formData:Color)
  {
    console.log(formData);
    return this.http.post(this.rootURL+'/Color',formData);
  }
  getColorDetailsByID(id:number):Observable<Color>
  {
    return this.http.get<Color>(this.rootURL+'/Color/'+id);
  }
  DeleteColorDetails(id:number)
  {
    return this.http.delete(this.rootURL+'/Color/'+id);
  }
}
