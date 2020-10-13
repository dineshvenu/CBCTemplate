import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UnitCategory } from 'src/app/shared/unit-category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UnitCategoryService } from 'src/app/shared/unit-category.service';

@Component({
  selector: 'app-create-unit-category',
  templateUrl: './create-unit-category.component.html',
  styleUrls: ['./create-unit-category.component.css']
})
export class CreateUnitCategoryComponent implements OnInit {
  createUnitCategoryForm: FormGroup;
  unitCategoryDetails:UnitCategory;
  submitted = false;
  constructor(private router: ActivatedRoute,private routerurl: Router,private fb:FormBuilder,private toastr:ToastrService,private service:UnitCategoryService) { }


  ngOnInit(): void {
    this.resetForm();
    let Id = +this.router.snapshot.paramMap.get("id");
   if(Id!=null)
      this.GetUnitById(Id);
  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createUnitCategoryForm=this.fb.group({
        UnitCatogoryID:  0, 
        UnitCatogory  :['', Validators.required],
        Rate:  0, 
      }
      );
  }
  get f() { return this.createUnitCategoryForm.controls; }
  onSubmit(form:FormGroup):void{
    this.submitted = true;
    if (this.createUnitCategoryForm.invalid) {
        return;
    }
    this.insertRecord(form);
  }
  insertRecord(form:FormGroup)
  {
     this.service.createUnitCategory(form.value).subscribe(
       res=>{
        if(res["Message"]!=null)
        this.toastr.warning(res["Message"],'UnitCategory Creation');
       else
      if(res["UnitCatogoryID"]<0)
        this.toastr.error('Failed','UnitCategory Creation');
      else
      {
       this.toastr.success('Inserted Successfully','UnitCategory Creation');
       this.routerurl.navigate(['Admin/Unit']);
      }
       },
       err=>{
         console.log(err)
         this.toastr.error('Failed','UnitCategory Creation');
       }       
       );
  }  
  GetUnitById(id:number)
  {
    this.service.getUnitCategoryByID(id).subscribe(
      res=>{
        this.unitCategoryDetails=res;
        this.createUnitCategoryForm.patchValue(res);
      },
      err=>{
        console.log(err);
      }
    );
  }
  Cancel()
  {
    this.routerurl.navigate(['Admin/UnitCategory']);
  }

}
