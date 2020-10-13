import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Sales } from 'src/app/shared/Sales/sales.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SalesService } from 'src/app/shared/Sales/sales.service';
import { Observable, from } from 'rxjs';
import { Dropdown } from 'src/app/shared/common/dropdown.model';
import { DropdownService } from 'src/app/shared/common/dropdown.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatAutocomplete } from '@angular/material/autocomplete'
import { SalesDetails } from 'src/app/shared/Sales/sales-details.model';
import { startWith, map } from 'rxjs/operators';
import { StockAutoComplete } from 'src/app/shared/Sales/stock-auto-complete.model';

@Component({
  selector: 'app-createsales',
  templateUrl: './createsales.component.html',
  styleUrls: ['./createsales.component.css']
})
export class CreatesalesComponent implements OnInit {
  value1 = '';
  displayedColumns = ['Stock','ItemPrice','TotalQty','Quantity', 'Price', 'Discount','SalesdAmt','Add','Delete'];
  InventoryList: SalesDetails[] = [];
  editSales:SalesDetails[] = [];
  dataSource = new MatTableDataSource(this.InventoryList);
  private newAttribute: any = {};
  createSalesForm: FormGroup;
  SalesDetails:Sales;
  submitted = false;
  public StockList: Observable<string[]>;
  public StockList1: string[] = [];
  SelstockId:string=""; 
  filteredOptions: Observable<string[]>;
  test:string="";
  test1:string="";
  salesId:number =0
  SelSalesAmt :string="";  
  SelBalanceAmt:number=0;  
  SelPaidAmt:number=0; 
  
  constructor(private router: ActivatedRoute,private routerurl: Router,private fb:FormBuilder,private toastr:ToastrService,private service:SalesService,private dropdownService:DropdownService) { }

  ngOnInit(): void {
    this.resetForm();    
    this.RefreshStock();    
    //this.addSalesFormGroup();
    this.addElement();  
    this.salesId=  +this.router.snapshot.paramMap.get("id");
    localStorage.setItem("salesId",this.router.snapshot.paramMap.get("id"));
   if(this.salesId!=0)
      this.getSalesDetailsByID(this.salesId);
  }
//begin 
itemClassOnChange(val) {
  this.StockList = (this.createSalesForm.get('salesDetailModels') as FormArray).valueChanges.pipe(
    startWith(''),
    map(value => this._filter(val)      
    )
  );
}
displayFn(stk: StockAutoComplete): string {
  let saleID=+localStorage.getItem("salesId"); 
  if(saleID>0)
  {    
    localStorage.setItem("salesId","0"); 
    return ""+stk;
  }
  else
    return "stk" ? stk.Name : "";
}

private _filter(value: string): string[] {
  
  const filterValue = value.toLowerCase();
  return this.StockList1.filter(option => option["Name"].toLowerCase().indexOf(filterValue) === 0);
}

onKeydown(event) {
  if (event.key === "Enter") {
  }
}
applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}

  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createSalesForm=this.fb.group({
        ID:  0, 
        InvoiceNo  :[''], 
        CustomerName  :['', Validators.required], 
        ContactNo  :[''], 
        ContactAddress  :[''], 
        InvoiceDate  :[''], 
        TotalAmount  :[''], 
        PaymentType  :[''], 
        PayedAmount  :[''], 
        DueDate  :[''], 
        BalanceAmt  :[''],          
        PurchasedAmt  :[''],  
        PaidAmount  :0,        
        
        salesDetailModels:this.fb.array([
          this.addSalesFormGroup()
        ]      
        )
      }
      );
  }
  addSalesFormGroup():FormGroup{
    return this.fb.group(
      {
        Stock:[''],
        StockID:0,
        ItemPrice:[''],
        TotalQty:[''],
        Price:[''],
        Quantity:['1'],
        Discount:[''],
        SalesdAmt:[''],
        SalesDetailID:0
      }
    );
  }
  addElement() { 
this.salesDetailModels.push(this.fb.group({
  Stock:[''],
  StockID:0,
  ItemPrice:[''],
  TotalQty:[''],
  Price:[''],
  Quantity:['1'],
  Discount:[''],
  SalesdAmt:[''],
  SalesDetailID:0
}));
this.InventoryList.push({SalesDetailID:0,TotalQty:"0",Unit:"0",Discount:0,SalesdAmt:"",Stock:"", StockID: 0, ItemPrice: this.value1, Quantity: 1, Price: "0"});
this.itemClassOnChange("");
this.dataSource = new MatTableDataSource(this.InventoryList);
}

  deleteElement(rowid: number){
    if (rowid > -1) {
      this.InventoryList.splice(rowid, 1);
      this.dataSource = new MatTableDataSource(this.InventoryList);
      }
      }
  //1
  get salesDetailModels(){
    return this.createSalesForm.get('salesDetailModels') as FormArray;
    }
     //1
 
  RefreshStock()
  { 
    //this.StockList=this.dropdownService.GetStockDropdown();
    this.dropdownService.GetStockAutocomplete().subscribe(
      res=>{
        this.StockList1=res;
      },
      err=>{
        console.log(err);
      }
    );
   
  }
  get f() { return this.createSalesForm.controls; }
  onSubmit(form:FormGroup):void{
   
    this.submitted = true;
    if (this.createSalesForm.invalid) {
        return;
    }
    this.insertRecord(form);
  }
  insertRecord(form:FormGroup)
  {
    console.log(form);
     this.service.createSalesDetails(form.value).subscribe(
       res=>{
         this.toastr.success('Inserted Successfully','Sales');
       },
       err=>{
         console.log(err)
         this.toastr.error('Failed','Sales Creation');
       }       
       );
  }  
  getSalesDetailsByID(id:number)
  {    
    this.service.getSalesDetailsByID(id).subscribe(
      res=>{
        this.SalesDetails=res;
        res.InvoiceDate=new Date(res.InvoiceDate);
        this.createSalesForm.patchValue(res);
        console.log(res);
        this.InventoryList=res.salesDetailModels;
        this.dataSource = new MatTableDataSource(this.InventoryList);
      },
      err=>{
        console.log(err);
      }
    );
  }
  //begin
  onStockOptionSelected(dataOption: any,rowid: number) {
 
    var stock=(<FormArray>this.createSalesForm.get('salesDetailModels')).controls[rowid].value.Stock ;
    
    (<FormArray>this.createSalesForm.get('salesDetailModels')).controls[rowid].value.ItemPrice=stock.Price;
       
    (<FormArray>this.createSalesForm.get('salesDetailModels')).controls[rowid].value.TotalQty=stock.TotalQty;
    
    this.setStock(rowid,stock.ID);
    this.InventoryList[rowid].Stock=stock.Name;
    this.InventoryList[rowid].ItemPrice=stock.Price;
    this.InventoryList[rowid].TotalQty=stock.TotalQty;
    this.QuantityValueChanged(rowid);
    this.DiscountPrice(rowid);
    this.calculateActualPrice();
    this.balanceAmount( this.SelPaidAmt)
    //this.dataSource = new MatTableDataSource(this.InventoryList);
   }
   setStock(rowid: number, stockID:number)
   {
    this.InventoryList[rowid].StockID=stockID;
    (<FormArray>this.createSalesForm.get('salesDetailModels')).controls[rowid].value.StockID=stockID;
   }
QuantityValueChanged(rowid: number)
{
  var Quantity=(<FormArray>this.createSalesForm.get('salesDetailModels')).controls[rowid].value.Quantity;
  var price:any=this.InventoryList[rowid].ItemPrice;
  (<FormArray>this.createSalesForm.get('salesDetailModels')).controls[rowid].value.Price=Quantity*price;
  
 this.InventoryList[rowid].Price=(Quantity*price).toString();
 (<FormArray>this.createSalesForm.get('salesDetailModels')).controls[rowid].value.StockID=this.InventoryList[rowid].StockID;
 (<FormArray>this.createSalesForm.get('salesDetailModels')).controls[rowid].value.Stock=this.InventoryList[rowid].Stock;
 (<FormArray>this.createSalesForm.get('salesDetailModels')).controls[rowid].value.ItemPrice=this.InventoryList[rowid].ItemPrice;
 var stock=(<FormArray>this.createSalesForm.get('salesDetailModels')).controls[rowid].value.Stock ;
 this.setStock(rowid,this.InventoryList[rowid].StockID);
 this.DiscountPrice(rowid);
 this.calculateActualPrice();
 this.balanceAmount( this.SelPaidAmt)
 //this.dataSource = new MatTableDataSource(this.InventoryList);
}
DiscountValueChanged(rowid: number)
{
  this.DiscountPrice(rowid);
  this.calculateActualPrice();
  this.balanceAmount( this.SelPaidAmt)
  this.setStock(rowid,this.InventoryList[rowid].StockID);
}
DiscountPrice(rowid: number)
{
  var Amt=+this.InventoryList[rowid].Price; 
  var Discount=+(<FormArray>this.createSalesForm.get('salesDetailModels')).controls[rowid].value.Discount;
  var total=(Amt)-(Discount);
  (<FormArray>this.createSalesForm.get('salesDetailModels')).controls[rowid].value.Price=this.InventoryList[rowid].Price;
  (<FormArray>this.createSalesForm.get('salesDetailModels')).controls[rowid].value.SalesdAmt=total.toString();
  this.InventoryList[rowid].SalesdAmt=total.toString();  
}
calculateActualPrice()
{
    var sum=0;
  for(let i = 0; i < this.InventoryList.length; i++) {
    sum += +this.InventoryList[i]["SalesdAmt"];
  }
  this.SelSalesAmt=sum.toString();
  return sum;
}

balanceAmount( paidAmt:number)
{
  this.SelBalanceAmt= +this.SelSalesAmt-paidAmt;
}

Cancel()
{
  this.routerurl.navigate(['Sales/sales']);
}
  //end

}
