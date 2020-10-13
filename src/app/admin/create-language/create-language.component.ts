import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Language } from 'src/app/shared/language.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/shared/language.service';

@Component({
  selector: 'app-create-language',
  templateUrl: './create-language.component.html',
  styleUrls: ['./create-language.component.css']
})
export class CreateLanguageComponent implements OnInit {

  createLanguageForm: FormGroup;
  LanguageDetails:Language;
  submitted = false;
  constructor(private router: ActivatedRoute,private routerurl: Router,private fb:FormBuilder,private toastr:ToastrService,private service:LanguageService) { }


  ngOnInit(): void {
    this.resetForm();
    let languageId = +this.router.snapshot.paramMap.get("id");
   if(languageId!=null)
      this.GetLanguageById(languageId);
  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createLanguageForm=this.fb.group({
        LanguageID:  0, 
        Language  :['', Validators.required]
      }
      );
  }
  get f() { return this.createLanguageForm.controls; }
  onSubmit(form:FormGroup):void{
    this.submitted = true;
    if (this.createLanguageForm.invalid) {
        return;
    }
    this.insertRecord(form);
  }
  insertRecord(form:FormGroup)
  {
     this.service.createLanguageDetails(form.value).subscribe(
       res=>{
        if(res["Message"]!=null)
        this.toastr.warning(res["Message"],'Language Creation');
       else
      if(res["LanguageID"]<0)
        this.toastr.error('Failed','Language Creation');
      else
      {
       this.toastr.success('Inserted Successfully','Language Creation');
       this.routerurl.navigate(['Admin/Languagelist']);
      }
       },
       err=>{
         console.log(err)
         this.toastr.error('Failed','Language Creation');
       }       
       );
  }  
  GetLanguageById(id:number)
  {
    this.service.getLanguageDetailsByID(id).subscribe(
      res=>{
        this.LanguageDetails=res;
        this.createLanguageForm.patchValue(res);
      },
      err=>{
        console.log(err);
      }
    );
  }

  Cancel()
  {
    this.routerurl.navigate(['Admin/Languagelist']);
  }
}
