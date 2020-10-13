import { Injectable } from '@angular/core';
import { BaseAppUrl } from '../_config/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dropdown } from './dropdown.model';
import { StockAutoComplete } from '../Sales/stock-auto-complete.model';
import { GetUnitDropdownWithValue } from '../get-unit-dropdown-with-value.model';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  readonly rootURL=BaseAppUrl;
  constructor(private http:HttpClient) { }
  getCategoryDetails():Observable<any>
  {
    return this.http.get<Dropdown>(this.rootURL+'/Dropdown/CategoryDropdown');
  }
  getSubCategoryDetails(ID):Observable<any>
  {
    return this.http.get<Dropdown>(this.rootURL+'/Dropdown/SubCategoryDropdown?ID='+ID);
  }
  getAutherDetails():Observable<any>
  {
    return this.http.get<Dropdown>(this.rootURL+'/Dropdown/GetAutherDropdown');
  }
  GetPublisherDropdown():Observable<any>
  {
    return this.http.get<Dropdown>(this.rootURL+'/Dropdown/GetPublisherDropdown');
  }
  GetLanguageDropdown():Observable<any>
  {
    return this.http.get<Dropdown>(this.rootURL+'/Dropdown/GetLanguageDropdown');
  }
  GetColorDropdown():Observable<any>
  {
    return this.http.get<Dropdown>(this.rootURL+'/Dropdown/GetColorDropdown');
  }
  GetCompanyDropdown():Observable<any>
  {
    return this.http.get<Dropdown>(this.rootURL+'/Dropdown/GetCompanyDropdown');
  }
  GetStockDropdown():Observable<any>
  {
    return this.http.get<Dropdown>(this.rootURL+'/Dropdown/GetStockDropdown');
  }
  GetStockAutocomplete():Observable<any>
  {
    return this.http.get<StockAutoComplete>(this.rootURL+'/Dropdown/GetAutoCompleteList');
  }
  GetUnitDropdownWithValue():Observable<any>
  {
    return this.http.get<GetUnitDropdownWithValue>(this.rootURL+'/Dropdown/GetUnitDropdownWithValue');
  }
  GetUnitDropdown():Observable<any>
  {
    return this.http.get<Dropdown>(this.rootURL+'/Dropdown/GetUnitDropdown');
  }
  GetSupplierDropDown():Observable<any>
  {
    return this.http.get<Dropdown>(this.rootURL+'/Dropdown/GetSupplierDropDown');
  }
  GetUnitCategoryDropDown():Observable<any>
  {
    return this.http.get<Dropdown>(this.rootURL+'/Dropdown/GetUnitCategoryDropDown');
  }
}
