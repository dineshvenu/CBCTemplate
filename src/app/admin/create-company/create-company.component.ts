import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from 'src/app/shared/company.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/shared/company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {
  createCompanyForm: FormGroup;
  CompanyDetails:Company;
  submitted = false;
  constructor(private router: ActivatedRoute,private routerurl: Router,private fb:FormBuilder,private toastr:ToastrService,private service:CompanyService) { }


  ngOnInit(): void {
    this.resetForm();
    let companyId = +this.router.snapshot.paramMap.get("id");
   if(companyId!=null)
      this.GetCompanyById(companyId);
  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createCompanyForm=this.fb.group({
        CompanyID:  0, 
        CompanyName  :['', Validators.required]
      }
      );
  }
  get f() { return this.createCompanyForm.controls; }
  onSubmit(form:FormGroup):void{
    this.submitted = true;
    if (this.createCompanyForm.invalid) {
        return;
    }
    this.insertRecord(form);
  }
  insertRecord(form:FormGroup)
  {
     this.service.createCompanyDetails(form.value).subscribe(
       res=>{ if(res["Message"]!=null)
       this.toastr.warning(res["Message"],'Company Creation');
      else
     if(res["CompanyID"]<0)
       this.toastr.error('Failed','Company Creation');
     else
     {
      this.toastr.success('Inserted Successfully','Company Creation');
      this.routerurl.navigate(['Admin/Company']);
     }
       },
       err=>{
         console.log(err)
         this.toastr.error('Failed','Company Creation');
       }       
       );
  }  
  GetCompanyById(id:number)
  {
    this.service.getCompanyDetailsByID(id).subscribe(
      res=>{
        this.CompanyDetails=res;
        this.createCompanyForm.patchValue(res);
      },
      err=>{
        console.log(err);
      }
    );
  }


  Cancel()
  {
    this.routerurl.navigate(['Admin/Company']);
  }

}
