import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Auther } from 'src/app/shared/auther.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutherService } from 'src/app/shared/auther.service';

@Component({
  selector: 'app-cteateauther',
  templateUrl: './cteateauther.component.html',
  styleUrls: ['./cteateauther.component.css']
})
export class CteateautherComponent implements OnInit {
  createAutherForm: FormGroup;
  autherDetails:Auther;
  submitted = false;
  constructor(private router: ActivatedRoute,private routerurl: Router,private fb:FormBuilder,private toastr:ToastrService,private service:AutherService) { }


  ngOnInit(): void {
    this.resetForm();
    let catId = +this.router.snapshot.paramMap.get("id");
   if(catId!=null)
      this.GetAtherById(catId);
  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createAutherForm=this.fb.group({
        AutherID:  0,  
        AutherName  :['', Validators.required]
      }
      );
  }
  get f() { return this.createAutherForm.controls; }
  onSubmit(form:FormGroup):void{
    this.submitted = true;
    if (this.createAutherForm.invalid) {
        return;
    }
    this.insertRecord(form);
  }
  insertRecord(form:FormGroup)
  {
     this.service.createAutherDetails(form.value).subscribe(
       res=>{
        if(res["Message"]!=null)
        this.toastr.warning(res["Message"],'Auther Creation');
       else
      if(res["AutherID"]<0)
        this.toastr.error('Failed','Auther Creation');
      else
      {
       this.toastr.success('Inserted Successfully','Auther Creation');
       this.routerurl.navigate(['Admin/Autherlist']);
      }
       },
       err=>{
         console.log(err)
         this.toastr.error('Failed','User Creation');
       }       
       );
  }  
  GetAtherById(id:number)
  {
    this.service.getAutherDetailsByID(id).subscribe(
      res=>{
        this.autherDetails=res;
        this.createAutherForm.patchValue(res);
      },
      err=>{
        console.log(err);
      }
    );
  }

  Cancel()
  {
    this.routerurl.navigate(['Admin/Autherlist']);
  }
}
