import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubcategoryService } from 'src/app/shared/subcategory.service';
import { Subcategory } from 'src/app/shared/subcategory.model';
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/shared/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-createsubcategory',
  templateUrl: './createsubcategory.component.html',
  styleUrls: ['./createsubcategory.component.css']
})
export class CreatesubcategoryComponent implements OnInit {
  createCategoryForm: FormGroup;
  CategoryDetails:Subcategory;
  submitted = false;  
  public categoryList: Observable<Category[]>;
  SelCaegoryId:string=""; 
  constructor(private router: ActivatedRoute,private routerurl: Router,private categoryservice:CategoryService,private fb:FormBuilder,private toastr:ToastrService,private service:SubcategoryService) { }

  ngOnInit(): void {
    this.resetForm();
     let CategoryId = +this.router.snapshot.paramMap.get("id");
    if(CategoryId!=null && CategoryId!=0)
    this.GetCategoryById(CategoryId);
    this.RefreshCategory();
  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createCategoryForm=this.fb.group({
        subCategoryID:  0,  
      categoryId:['',Validators.required],
        subCatCode  :[{value:'',disabled:true}, Validators.required],
        description  :['', Validators.required]
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
     this.service.createSubCategory(form.value).subscribe(
       res=>{
        if(res["Message"]!=null)
        this.toastr.warning(res["Message"],'Sub Category Creation');
       else
      if(res["categoryID"]<0)
        this.toastr.error('Failed','Sub Category Creation');
      else
      {
       this.toastr.success('Inserted Successfully','Sub Category Creation');
       this.routerurl.navigate(['Admin/Subcategorylist']);
      }
       },
       err=>{
         console.log(err)
         this.toastr.error('Failed','Sub Category Creation');
       }       
       );
  }  
  GetCategoryById(id:number)
  {
    this.service.getSubCategoryByID(id).subscribe(
      res=>{
        this.CategoryDetails=res;
        this.createCategoryForm.patchValue(res);
      },
      err=>{
        console.log(err);
      }
    );
  }
  RefreshCategory()
  { 
    this.categoryList=this.categoryservice.getCategoryDetails(); 
  }
  Cancel()
  {
    this.routerurl.navigate(['Admin/Subcategorylist']);
  }

}
