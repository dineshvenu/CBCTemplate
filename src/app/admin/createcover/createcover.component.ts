import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cover } from 'src/app/shared/cover.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoverService } from 'src/app/shared/cover.service';

@Component({
  selector: 'app-createcover',
  templateUrl: './createcover.component.html',
  styleUrls: ['./createcover.component.css']
})
export class CreatecoverComponent implements OnInit {

  createCoverForm: FormGroup;
  CoverDetails:Cover;
  submitted = false;
  constructor(private router: ActivatedRoute,private fb:FormBuilder,private toastr:ToastrService,private service:CoverService) { }


  ngOnInit(): void {
    this.resetForm();
    let coverId = +this.router.snapshot.paramMap.get("id");
   if(coverId!=null)
      this.GetCoverById(coverId);
  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createCoverForm=this.fb.group({
        ID:  0, 
        CategoryID:0, 
        CoverType  :['', Validators.required],
        Price:0
      }
      );
  }
  get f() { return this.createCoverForm.controls; }
  onSubmit(form:FormGroup):void{
    this.submitted = true;
    if (this.createCoverForm.invalid) {
        return;
    }
    this.insertRecord(form);
  }
  insertRecord(form:FormGroup)
  {
     this.service.createCoverDetails(form.value).subscribe(
       res=>{
         this.toastr.success('Inserted Successfully','Cover Details');
       },
       err=>{
         console.log(err)
         this.toastr.error('Failed','User Creation');
       }       
       );
  }  
  GetCoverById(id:number)
  {
    this.service.getCoverDetailsByID(id).subscribe(
      res=>{
        this.CoverDetails=res;
        this.createCoverForm.patchValue(res);
      },
      err=>{
        console.log(err);
      }
    );
  }

}
