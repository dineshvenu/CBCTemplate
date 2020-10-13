import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Stock } from 'src/app/shared/Inventory/stock.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StockService } from 'src/app/shared/Inventory/stock.service';
import { Observable } from 'rxjs';
import { DropdownService } from 'src/app/shared/common/dropdown.service';
import { CategoryService } from 'src/app/shared/category.service';
import { Dropdown } from 'src/app/shared/common/dropdown.model';

@Component({
  selector: 'app-createstock',
  templateUrl: './createstock.component.html',
  styleUrls: ['./createstock.component.css']
})
export class CreatestockComponent implements OnInit {
  public categoryList: Observable<Dropdown[]>;
  public subCategoryList: Observable<Dropdown[]>;
  public AutherList: Observable<Dropdown[]>;
  public PublisherList: Observable<Dropdown[]>;
  public LanguageList: Observable<Dropdown[]>;
  public ColorList: Observable<Dropdown[]>;
  public CompanyList: Observable<Dropdown[]>;
  LanguageList1: Dropdown[] = [];
  createStockForm: FormGroup;
  Stocks:Stock;
  submitted = false;
  SelCaegoryId:string="";   
  SelSubCaegoryId:string=""; 
  SelAutherId:string=""; 
  SelPublisherId:string=""; 
  SelLanguageId:string=""; 
  SelColorId:string=""; 
  SelCompanyId:string=""; 
  showBooksDiv:boolean=false;
  showStationaryDiv:boolean=false;
  constructor(private router: ActivatedRoute,private routerurl: Router,private categoryservice:CategoryService,private dropdownService:DropdownService,private fb:FormBuilder,private toastr:ToastrService,private service:StockService) { }


  ngOnInit(): void {
    this.resetForm();
    this.RefreshCategory();
    this.getSubCategoryDropDown(0);
    this.getAutherDropDown();
    this.GetPublisherDropdown();
    this.GetLanguageDropdown();
    this.GetColorDropdown();
    this.GetCompanyDropdown();
    let stockId = +this.router.snapshot.paramMap.get("id");
   if(stockId!=null && stockId!=0)
   {
      this.GetStockById(stockId);
      console.log('5');
    console.log(this.Stocks);
    console.log('6');
   }

  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createStockForm=this.fb.group({
        ID:  0, 
        BookID:  [''], 
        StationaryID: [''], 
        CategoryID  :[0, Validators.required], 
        CommodityName  :['', Validators.required], 
        AutherID  :[''], 
        PblisherID  :[''], 
        LanguageID  :[''],  
        SubCategoryID :[''],
        ColorID  :[''],
        CompanyID  :[''],
        PublishedYear  :null,
        Price  :[0, Validators.required]
      }
      );
  }
  get f() { return this.createStockForm.controls; }
  onSubmit(form:FormGroup):void{
    this.submitted = true;
    if (this.createStockForm.invalid) {
        return;
    }
    //console.log(form);
    this.insertRecord(form);
  }
  insertRecord(form:FormGroup)
  {console.log(form.value);
     this.service.createStockDetails(form.value).subscribe(
       res=>{
         this.toastr.success('Inserted Successfully','Stock Details');
       },
       err=>{
         console.log(err)
         this.toastr.error('Failed','Stock Creation');
       }       
       );
  }  
  GetStockById(id:number)
  {
    
    this.service.getStockDetailsByID(id).subscribe(
      res=>{
        this.Stocks=res;
        this.onCategoryChange(res.CategoryID);
        this.createStockForm.patchValue(res);
        this.SelLanguageId=res.LanguageID?.toString();
        this.SelAutherId=res.AutherID?.toString();
        this.SelPublisherId=res.PblisherID?.toString(); 
        this.SelColorId=res.ColorID?.toString();
        this.SelCompanyId=res.CompanyID?.toString();
        this.SelCaegoryId=res.CategoryID?.toString(); 
        this.SelSubCaegoryId=res.SubCategoryID?.toString();
      },
      err=>{
        console.log(err);
      }
    );
  }
  RefreshCategory()
  { 
    this.categoryList=this.dropdownService.getCategoryDetails();
  }
  getSubCategoryDropDown(SelCaegoryId)
  {
    this.onCategoryChange(SelCaegoryId);
    this.subCategoryList=null;
    this.subCategoryList=this.dropdownService.getSubCategoryDetails(SelCaegoryId);
  }
  onCategoryChange(SelCaegoryId)
  {
    if(SelCaegoryId==11)
    {
      this.showBooksDiv=true;
      this.showStationaryDiv=false;
    }
    else if(SelCaegoryId==14)
    {
      this.showStationaryDiv=true;
      this.showBooksDiv=false;
    }
    else
    {
      this.showBooksDiv=false;
      this.showStationaryDiv=false;
    }
  }
  getAutherDropDown()
  {
    this.AutherList=this.dropdownService.getAutherDetails();
  } 
  GetPublisherDropdown()
  {
    this.PublisherList=this.dropdownService.GetPublisherDropdown();
  }
  GetLanguageDropdown()
  {
    this.LanguageList=this.dropdownService.GetLanguageDropdown();
    this.dropdownService.GetLanguageDropdown().subscribe((Stock) => {this.LanguageList1 = Stock;});
    console.log(this.LanguageList1);
  }
  GetColorDropdown()
  {
    this.ColorList=this.dropdownService.GetColorDropdown();
  }
  GetCompanyDropdown()
  {
    this.CompanyList=this.dropdownService.GetCompanyDropdown();
  } 

  Cancel()
  {
    this.routerurl.navigate(['inventory/Stock']);
  }
}
