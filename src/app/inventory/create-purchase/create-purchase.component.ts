import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Dropdown } from 'src/app/shared/common/dropdown.model';
import { DropdownService } from 'src/app/shared/common/dropdown.service';
import { GetUnitDropdownWithValue } from 'src/app/shared/get-unit-dropdown-with-value.model';
import { StockAutoComplete } from 'src/app/shared/Sales/stock-auto-complete.model';
import { PurchaseDetails } from '../shared/purchase-details.model';
import { Purchase } from '../shared/purchase.model';
import { PurchaseService } from '../shared/purchase.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;


@Component({
  selector: 'app-create-purchase',
  templateUrl: './create-purchase.component.html',
  styleUrls: ['./create-purchase.component.css']
})
export class CreatePurchaseComponent implements OnInit {

  //start
  public UnitList: Observable<GetUnitDropdownWithValue[]>;
  public UnitListnew:GetUnitDropdownWithValue[];
  public unit:GetUnitDropdownWithValue;
  SelUnitId:string="";  
  SelPurchasedAmt :string="";  
  SelBalanceAmt :number=0;  
  SelPaidAmt:number=0; 
  public SupplierList: Observable<Dropdown[]>;
  SelSupplierId:string=""; 
  unitRelation:string="";
  unitRelationN:number=0;
  DODDate:Date;
  //end
  value1 = '';
  displayedColumns = ['Stock','ItemPrice','TotalQty', 'UnitID','Relation','PurchaseQty','TotalAmt', 'Discount','PurchasedAmt','Add','Delete'];
  PurchaseDetailsList: PurchaseDetails[] = [];
  editPurchase:PurchaseDetails[] = [];
  dataSource = new MatTableDataSource(this.PurchaseDetailsList);
  private newAttribute: any = {};
  createPurchaseForm: FormGroup;
  PurchaseDetails:Purchase;
  submitted = false;
  public StockList: Observable<string[]>;
  public StockList1: string[] = [];
  SelstockId:string=""; 
  filteredOptions: Observable<string[]>;
  test:string="";
  test1:string="";
  Id:number =0
  
  constructor(private router: ActivatedRoute,private routerurl: Router,private fb:FormBuilder,private toastr:ToastrService,private service:PurchaseService,private dropdownService:DropdownService) { }

  ngOnInit(): void {
    //start
    this.GetSupplierDropDown();
    this.GetUnitDropdown();
    //end
    this.resetForm();    
    this.RefreshStock(); 
    this.addElement(); 
    
    this.Id=  +this.router.snapshot.paramMap.get("id");
    localStorage.setItem("PurchaseId",this.router.snapshot.paramMap.get("id"));
   if(this.Id!=0)
      this.getSalesDetailsByID(this.Id);
  }
//begin 
itemClassOnChange(val) {
  this.StockList = (this.createPurchaseForm.get('purchaseDtlModels') as FormArray).valueChanges.pipe(
    startWith(''),
    map(value => this._filter(val)      
    )
  );
}
displayFn(stk: StockAutoComplete): string {
  
  let PurchaseId=+localStorage.getItem("PurchaseId"); 
 
  if(stk.Name==undefined)
  {   
    //localStorage.setItem("PurchaseId","0"); 
    return ""+stk;
  }
  else
  {
    return "stk" ? stk.Name : "";
  }
}


private _filter(value: string): string[] {
  
  const filterValue = value.toLowerCase();
  return this.StockList1.filter(option => option["Name"].toLowerCase().indexOf(filterValue) === 0);
}
onKeydown(event) {
  // if (event.key === "Enter") {
  // }
}
applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}

  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createPurchaseForm=this.fb.group({
        ID:  0, 
        PuchaseNo  :[''], 
        SupplierID  :[''], 
        PurchaseDate  :[''], 
        PurchasedAmt  :['0'],  
        PaidAmount  :0, 
        BalanceAmount  :['0'],   
        
        purchaseDtlModels:this.fb.array([
          this.addPurchaseFormGroup()
        ]      
        )
      }
      );
  }
  addPurchaseFormGroup():FormGroup{
    return this.fb.group(
      {
        PurchaseDetailsID:0,
        ItemPrice:[''],
        PurchaseID:[''],
        StockID:[''],
        TotalQty:[''],
        Stock:[''],
        CommodityName:[''],
        UnitID:0,
        Relation:0,
        PurchaseQty:['1'],
        Discount:['0'],
        PurchasedAmt:['0'],
        TotalAmt:['']
      }
    );
    
  }
  addElement() { 
this.purchaseDtlModels.push(this.fb.group({
  PurchaseDetailsID:0,
  PurchaseID:[''],
  StockID:[''],
  TotalQty:[''],
  Stock:[''],
  CommodityName:[''],
  UnitID:0,
  Relation:0,
  PurchaseQty:['1'],
  Discount:['0'],
  PurchasedAmt:['0'],
  ItemPrice:[''],
  TotalAmt:['']
}));
this.PurchaseDetailsList.push({PurchaseDetailsID:0, PurchaseID:"0",StockID:"",Stock:"",TotalQty:"",CommodityName:"",UnitID:0,Relation:"", PurchaseQty: "1", Discount: "0",TotalAmt:"",ItemPrice:"", PurchasedAmt: "0"});
this.itemClassOnChange("");
this.dataSource = new MatTableDataSource(this.PurchaseDetailsList);
}

  deleteElement(rowid: number){
    if (rowid > 0) {
        this.PurchaseDetailsList.splice(rowid, 1);
        this.dataSource = new MatTableDataSource(this.PurchaseDetailsList);
      }
  }
  get purchaseDtlModels(){
    return this.createPurchaseForm.get('purchaseDtlModels') as FormArray;
    }
 
  RefreshStock()
  { 
    this.dropdownService.GetStockAutocomplete().subscribe(
      res=>{
        this.StockList1=res;
      },
      err=>{
        console.log(err);
      }
    );
   
  }
  get f() { return this.createPurchaseForm.controls; }
  onSubmit(form:FormGroup):void{
   
    this.submitted = true;
    if (this.createPurchaseForm.invalid) {
        return;
    }
    this.insertRecord(form);
  }
  insertRecord(form:FormGroup)
  {
    console.log(form);
     this.service.createPurchaseDetails(form.value).subscribe(
       res=>{
         this.toastr.success('Inserted Successfully','Sales');         
        this.resetForm(); 
       },
       err=>{
         console.log(err)
         this.toastr.error('Failed','Sales Creation');
       }       
       );
  }  
  getSalesDetailsByID(id:number)
  {    
    this.service.getPurchaseDetailsByID(id).subscribe(
      res=>{
        this.PurchaseDetails=res;
        console.log("res");
        console.log(res);
        res.PurchaseDate=new Date(res.PurchaseDate);        
        this.createPurchaseForm.patchValue(res);
        this.PurchaseDetailsList=res.purchaseDtlModels;
        this.dataSource = new MatTableDataSource(this.PurchaseDetailsList);
      },
      err=>{
        console.log(err);
      }
    );
  }
  //start
  GetUnitDropdown()
  { 
    this.UnitList=this.dropdownService.GetUnitDropdownWithValue();
    this.UnitList.subscribe((sales) => {this.UnitListnew= sales;});
  }
  
  GetSupplierDropDown()
  { 
    this.SupplierList=this.dropdownService.GetSupplierDropDown();
  }
onStochange(rowid: number){
  var relation= (<FormArray>this.createPurchaseForm.get('purchaseDtlModels')).controls[rowid].value.Relation;
  this.setStock(rowid)
  this.getTotalPrice(relation,rowid);
  this.finalPrice(rowid);
  this.dataSource = new MatTableDataSource(this.PurchaseDetailsList);
  this.calculateActualPrice();
  this.balanceAmount( this.SelPaidAmt)
}
setStock(rowid: number) { 
  var stock=(<FormArray>this.createPurchaseForm.get('purchaseDtlModels')).controls[rowid].value.Stock ;

  (<FormArray>this.createPurchaseForm.get('purchaseDtlModels')).controls[rowid].value.StockID=stock.ID.toString();
  (<FormArray>this.createPurchaseForm.get('purchaseDtlModels')).controls[rowid].value.ItemPrice=stock.Price;
  (<FormArray>this.createPurchaseForm.get('purchaseDtlModels')).controls[rowid].value.TotalQty=stock.TotalQty;
  this.PurchaseDetailsList[rowid].StockID=stock.ID.toString();
  this.PurchaseDetailsList[rowid].ItemPrice=stock.Price;
  this.PurchaseDetailsList[rowid].TotalQty=stock.TotalQty;
 }
 getTotalAmtonUnitSelect(unitID,rowid: number)
{
 var relation= this.UnitListnew.filter(x => x.ID == unitID.value)[0].Relation;
 this.setStock(rowid)
 this.getTotalPrice(relation,rowid);
 this.finalPrice(rowid);
 this.dataSource = new MatTableDataSource(this.PurchaseDetailsList);
 this.calculateActualPrice();
 this.balanceAmount( this.SelPaidAmt)
}
getTotalPrice(relation:number,rowid: number){
  var qty=(<FormArray>this.createPurchaseForm.get('purchaseDtlModels')).controls[rowid].value.PurchaseQty;
  var price=+this.PurchaseDetailsList[rowid].ItemPrice;
  var total=relation*qty*price;
  this.PurchaseDetailsList[rowid].TotalAmt=total.toString(); 
  (<FormArray>this.createPurchaseForm.get('purchaseDtlModels')).controls[rowid].value.Relation=relation;
  this.PurchaseDetailsList[rowid].Relation=relation.toString();
  (<FormArray>this.createPurchaseForm.get('purchaseDtlModels')).controls[rowid].value.TotalAmt=total.toString();
  //this.finalPrice(rowid);  
}

onQtySelected(rowid: number)
{
  var relation= this.PurchaseDetailsList[rowid].Relation;
  this.setStock(rowid)
  this.getTotalPrice(+relation,rowid);
  this.finalPrice(rowid);  
  this.dataSource = new MatTableDataSource(this.PurchaseDetailsList);
  this.calculateActualPrice();
 this.balanceAmount( this.SelPaidAmt)
}
onDiscountChanged(rowid: number)
{
  this.finalPrice(rowid);  
  var unitID= this.PurchaseDetailsList[rowid].Relation;
  this.setStock(rowid);
  this.getTotalPrice(+unitID,rowid);
  this.calculateActualPrice();
 this.balanceAmount( this.SelPaidAmt)
}
finalPrice(rowid: number)
{
  var Amt=+this.PurchaseDetailsList[rowid].TotalAmt;  
  var Discount=+(<FormArray>this.createPurchaseForm.get('purchaseDtlModels')).controls[rowid].value.Discount;
  var total=(Amt)-(Discount);
  (<FormArray>this.createPurchaseForm.get('purchaseDtlModels')).controls[rowid].value.PurchasedAmt=total.toString();

  this.PurchaseDetailsList[rowid].PurchasedAmt=total.toString();
  
}

calculateActualPrice()
{
  var sum=0;
  for(let i = 0; i < this.PurchaseDetailsList.length; i++) {
    sum += +this.PurchaseDetailsList[i]["PurchasedAmt"];
  }
  this.SelPurchasedAmt=sum.toString();
  return sum;
}
balanceAmount( paidAmt:number)
{
this.SelBalanceAmt= +this.SelPurchasedAmt-paidAmt;
}

Cancel()
{
  this.routerurl.navigate(['inventory/Purchase']);
}
  //end

}
