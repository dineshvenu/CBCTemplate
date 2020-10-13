import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Publisher } from 'src/app/shared/publisher.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PublisherService } from 'src/app/shared/publisher.service';

@Component({
  selector: 'app-createpublisher',
  templateUrl: './createpublisher.component.html',
  styleUrls: ['./createpublisher.component.css']
})
export class CreatepublisherComponent implements OnInit {
  createPublisherForm: FormGroup;
  publisherDetails:Publisher;
  submitted = false;
  constructor(private router: ActivatedRoute,private routerurl: Router,private fb:FormBuilder,private toastr:ToastrService,private service:PublisherService) { }


  ngOnInit(): void {
    this.resetForm();
    let catId = +this.router.snapshot.paramMap.get("id");
   if(catId!=null)
      this.GetPublisherById(catId);
  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createPublisherForm=this.fb.group({
        PblisherID:  0,  
        PublisherName  :['', Validators.required]
      }
      );
  }
  get f() { return this.createPublisherForm.controls; }
  onSubmit(form:FormGroup):void{
    this.submitted = true;
    if (this.createPublisherForm.invalid) {
        return;
    }
    this.insertRecord(form);
  }
  insertRecord(form:FormGroup)
  {
     this.service.createPublisherDetails(form.value).subscribe(
       res=>{
        if(res["Message"]!=null)
        this.toastr.warning(res["Message"],'Publisher Creation');
       else
      if(res["PblisherID"]<0)
        this.toastr.error('Failed','Publisher Creation');
      else
      {
       this.toastr.success('Inserted Successfully','Publisher Creation');
       this.routerurl.navigate(['Admin/Publisherlist']);
      }
       },
       err=>{
         console.log(err)
         this.toastr.error('Failed','User Creation');
       }       
       );
  }  
  GetPublisherById(id:number)
  {
    this.service.getPublisherDetailsByID(id).subscribe(
      res=>{
        this.publisherDetails=res;
        this.createPublisherForm.patchValue(res);
      },
      err=>{
        console.log(err);
      }
    );
  }
  Cancel()
  {
    this.routerurl.navigate(['Admin/Publisherlist']);
  }
}
