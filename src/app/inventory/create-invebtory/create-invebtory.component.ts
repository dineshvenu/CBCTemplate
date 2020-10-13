import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Inventory } from 'src/app/shared/Inventory/inventory.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from 'src/app/shared/Inventory/inventory.service';
import { Observable } from 'rxjs';
import { Dropdown } from 'src/app/shared/common/dropdown.model';
import { DropdownService } from 'src/app/shared/common/dropdown.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-create-invebtory',
  templateUrl: './create-invebtory.component.html',
  styleUrls: ['./create-invebtory.component.css']
})
export class CreateInvebtoryComponent implements OnInit {

  createInventoryForm: FormGroup;
  InventoryDetails:Inventory=new Inventory();
  submitted = false;
  public StockList: Observable<Dropdown[]>;
  SelstockId:string="";  
  public UnitList: Observable<Dropdown[]>;
  SelUnitId:string="";  
  public SupplierList: Observable<Dropdown[]>;
  SelSupplierId:string="";  
  pricetxt:number=0;
  Discounttxt:number=0;
  TotalAmountxt:number=0;
  PurchasedAmttxt:number=0;
  StockQtytxt:number=0;
  constructor(private router: ActivatedRoute,private dropdownService:DropdownService,private fb:FormBuilder,private toastr:ToastrService,private service:InventoryService) { }


  ngOnInit(): void {
    this.resetForm();
    this.RefreshStock();
    this.GetUnitDropdown();
    let catId = +this.router.snapshot.paramMap.get("id");
   if(catId!=null)
   {
      this.GetInventoryById(catId);
   }
  }
  CalculateDiscount()
  {
     this.PurchasedAmttxt=this.pricetxt-(this.pricetxt*this.Discounttxt/100);
     this.TotalAmountxt=this.PurchasedAmttxt*this.StockQtytxt;
  }
  RefreshStock()
  { 
    this.StockList=this.dropdownService.GetStockDropdown();
  }
  GetUnitDropdown()
  { 
    this.UnitList=this.dropdownService.GetUnitDropdown();
  }
  
  GetSupplierDropDown()
  { 
    this.SupplierList=this.dropdownService.GetSupplierDropDown();
  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createInventoryForm=this.fb.group({
        ID:  0,  
        StockID  :['', Validators.required],   
        CurrentStock:0,     
        TotalSoldQty : 0,           
        StockQty  :0,
        ProductName:[''],
        UnitId:[''],
        SupplierId:[''],
        PurchasedAmt:0,
        Discount:0,
        TotalAmount:0,
        IndividualAmt:0
      }
      );
  }
  get f() { return this.createInventoryForm.controls; }
  onSubmit(form:FormGroup):void{
    this.submitted = true;
    if (this.createInventoryForm.invalid) {
        return;
    }
    this.insertRecord(form);
  }
  insertRecord(form:FormGroup)
  { 
     this.service.createInventory(form.value).subscribe(
       res=>{
         this.toastr.success('Inserted Successfully','Inventory Creation');
       },
       err=>{
         console.log(err)
         this.toastr.error('Failed','Inventory Creation');
       }       
       );
  }  
  GetInventoryById(id:number)
  {
    this.service.getInventoryByID(id).subscribe(
      res=>{
        this.InventoryDetails=res;
        res.TotalAmount=res.PurchasedAmt*res.StockQty;
        this.createInventoryForm.patchValue(res);
      },
      err=>{
        console.log(err);
      }
    );
  }
  GetInventoryByStockID(stockID)
  { 
    this.service.GetInventoryByStockID(stockID).pipe(filter(res => res !== null))
    .subscribe(
      res=>{       
        if(res){    
        this.InventoryDetails.CurrentStock=res.CurrentStock;       
        this.InventoryDetails.ID=res.ID;   
        console.log(res);
        this.createInventoryForm.patchValue(this.InventoryDetails);
        }
      },
      err=>{
        console.log(err);
      }
    );    
  }  

}
