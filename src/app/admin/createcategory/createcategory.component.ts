import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/shared/category.model';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createcategory',
  templateUrl: './createcategory.component.html',
  styleUrls: ['./createcategory.component.css']
})
export class CreatecategoryComponent implements OnInit {
  createCategoryForm: FormGroup;
  categoryDetails:Category;
  submitted = false;
  constructor(private router: ActivatedRoute,private routerurl: Router,private fb:FormBuilder,private toastr:ToastrService,private service:CategoryService) { }

  ngOnInit(): void {
    this.resetForm();
     let catId = +this.router.snapshot.paramMap.get("id");
    if(catId!=0)
    this.GetCategoryById(catId);
  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createCategoryForm=this.fb.group({
        categoryID:  0,  
        CategoryCode:[{value:'',disabled:true}],
        categoryName  :['', Validators.required]
      }
      );
  }
  get f() { return this.createCategoryForm.controls; }
  onSubmit(form:FormGroup):void{
    this.submitted = true;
    if (this.createCategoryForm.invalid) {
        return;
    }
    this.insertRecord(form);
  }
  insertRecord(form:FormGroup)
  {
     this.service.createCategory(form.value).subscribe(
       res=>{
         if(res["Message"]!=null)
          this.toastr.warning(res["Message"],'Category Creation');
         else
        if(res["categoryID"]<0)
          this.toastr.error('Failed','Category Creation');
        else
        {
         this.toastr.success('Inserted Successfully','Category Creation');
         this.routerurl.navigate(['Admin/Categorylist']);
        }
       },
       err=>{
         console.log(err)
         this.toastr.error('Failed','Category Creation');
       }       
       );
  }  
  GetCategoryById(id:number)
  {
    this.service.getCategoryByID(id).subscribe(
      res=>{
        this.categoryDetails=res;
        this.createCategoryForm.patchValue(res);
      },
      err=>{
        console.log(err);
      }
    );
  }
  Cancel()
  {
    this.routerurl.navigate(['Admin/Categorylist']);
  }

}
