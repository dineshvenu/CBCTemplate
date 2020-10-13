import { Injectable } from '@angular/core';
import { UserDetails } from './user-details.model';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Loginmodel } from './loginmodel.model';
import {BaseAppUrl} from './_config/base-url';
import { Observable } from 'rxjs';
import { Userpopup } from './userpopup.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  fullName:string="";
  formData:UserDetails
  readonly rootURL=BaseAppUrl;

  constructor(private http:HttpClient) { }
  
  postUserDetails(formData:UserDetails)
  {
   // return this.http.get(this.rootURL+'/User');
   formData.UserName=formData.MobileNo;
    return this.http.post(this.rootURL+'/User',formData);
  }
  login(formData:Loginmodel)
  {
    return this.http.post(this.rootURL+'/User/Login',formData);
  }
  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
  getToken() {
    return localStorage.getItem("token");
  }
  removeRole() {
    return localStorage.removeItem("role");
  }
  removeToken() {
    return localStorage.removeItem("token");
  }
  getUserDetailsByID(id:number):Observable<UserDetails>
  {
    return this.http.get<UserDetails>(this.rootURL+'/User/GetUserByID?id='+id);
  }
  getUser():Observable<any>
  {
    return this.http.get<UserDetails>(this.rootURL+'/User');
  }
  getUserDetails()
  {
    var tokenHeader=new HttpHeaders({'Autherization':'Bearer '+localStorage.getItem("token")});
    return this.http.get(this.rootURL+'/User/Login',{headers:tokenHeader});
  }
  getUserPopup():Observable<any>
  {
    return this.http.get<Userpopup>(this.rootURL+'/User/UserPopup');
  }
  storeRole(role: any) {
    
    this.removeRole();
    localStorage.setItem('role', JSON.stringify(role));
  }
  DeleteUser(id:number)
  {
    return this.http.delete(this.rootURL+'/User/'+id);
  }
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var userRoles: string[] = JSON.parse( localStorage.getItem('role')); 
    allowedRoles.forEach(element => {        
      if (userRoles!=null && element==userRoles["roleName"]) {  
      this.fullName=userRoles["firstName"];
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}
