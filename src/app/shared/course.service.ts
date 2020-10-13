import { Injectable } from '@angular/core';
import { BaseAppUrl } from './_config/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getCourseDetails():Observable<any>
  {
    return this.http.get<Course>(this.rootURL+'/Course');
  }
  createCourse(formData:Course)
  {
    return this.http.post(this.rootURL+'/Course',formData);
  }
  getCourseByID(id:number):Observable<Course>
  {
    return this.http.get<Course>(this.rootURL+'/Course/'+id);
  }
  DeleteCourse(id:number)
  {
    return this.http.delete(this.rootURL+'/Course/'+id);
  }
}
