import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Unit } from 'src/app/shared/unit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UnitService } from 'src/app/shared/unit.service';
import { DropdownService } from 'src/app/shared/common/dropdown.service';
import { Observable } from 'rxjs';
import { Dropdown } from 'src/app/shared/common/dropdown.model';

@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.css']
})
export class CreateUnitComponent implements OnInit {
  createUnitForm: FormGroup;
  unitDetails:Unit;
  submitted = false;
  public UnitcategoryList: Observable<Dropdown[]>;
  SelUnitCaegoryId:string="";
  constructor(private router: ActivatedRoute,private routerurl: Router,private dropdownService:DropdownService,private fb:FormBuilder,private toastr:ToastrService,private service:UnitService) { }


  ngOnInit(): void {
    this.resetForm();
    this.getAutherDropDown();
    let Id = +this.router.snapshot.paramMap.get("id");
   if(Id!=null)
      this.GetUnitById(Id);
  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createUnitForm=this.fb.group({
        UnitID:0,
        UnitCategoryID:  0, 
        UnitName  :['', Validators.required],
        UnitCatogoryRelation:  0, 
      }
      );
  }
  get f() { return this.createUnitForm.controls; }
  onSubmit(form:FormGroup):void{
    this.submitted = true;
    if (this.createUnitForm.invalid) {
        return;
    }
    this.insertRecord(form);
  }
  insertRecord(form:FormGroup)
  {
     this.service.createUnit(form.value).subscribe(
       res=>{
        if(res["Message"]!=null)
        this.toastr.warning(res["Message"],'Unit Creation');
       else
      if(res["UnitID"]<0)
        this.toastr.error('Failed','Unit Creation');
      else
      {
       this.toastr.success('Inserted Successfully','Unit Creation');
       this.routerurl.navigate(['Admin/Unit']);
      }
       },
       err=>{
         console.log(err)
         this.toastr.error('Failed','Unit Creation');
       }       
       );
  }  
  GetUnitById(id:number)
  {
    this.service.getUnitByID(id).subscribe(
      res=>{
        this.unitDetails=res;
        this.createUnitForm.patchValue(res);
      },
      err=>{
        console.log(err);
      }
    );
  }
  getAutherDropDown()
  {
    this.UnitcategoryList=this.dropdownService.GetUnitCategoryDropDown();
  }
  Cancel()
  {
    this.routerurl.navigate(['Admin/Unit']);
  }
}
