import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Clientcategory } from 'src/app/shared/clientcategory.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientcategoryService } from 'src/app/shared/clientcategory.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createclientcategory',
  templateUrl: './createclientcategory.component.html',
  styleUrls: ['./createclientcategory.component.css']
})
export class CreateclientcategoryComponent implements OnInit {
  createCategoryForm: FormGroup;
  CategoryDetails:Clientcategory;
  submitted = false;  
  constructor(private router: ActivatedRoute,private routerurl: Router,private service:ClientcategoryService,private fb:FormBuilder,private toastr:ToastrService) { }


  ngOnInit(): void {
    this.resetForm();
    let CategoryId = +this.router.snapshot.paramMap.get("id");
   if(CategoryId!=null && CategoryId!=0)
   this.GetCategoryById(CategoryId);
  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createCategoryForm=this.fb.group({
        clientCategoryID:  0,  
        clientCategory:["",Validators.required]
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
     this.service.createClientCategory(form.value).subscribe(
       res=>{
        if(res["Message"]!=null)
          this.toastr.warning(res["Message"],'Category Creation');
       else
      if(res["id"]<0)
        this.toastr.error('Failed','Category Creation');
      else
      {
        this.toastr.success('Inserted Successfully','Category Creation');;
       this.routerurl.navigate(['Admin/Clientcategorylist']);
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
    this.service.getClientCategoryByID(id).subscribe(
      res=>{
        this.CategoryDetails=res;
        this.createCategoryForm.patchValue(res);
      },
      err=>{
        console.log(err);
      }
    );
  }
  Cancel()
  {
    this.routerurl.navigate(['Admin/Clientcategorylist']);
  }

}
