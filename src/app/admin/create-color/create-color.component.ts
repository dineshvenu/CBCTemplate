import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Color } from 'src/app/shared/color.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/shared/color.service';

@Component({
  selector: 'app-create-color',
  templateUrl: './create-color.component.html',
  styleUrls: ['./create-color.component.css']
})
export class CreateColorComponent implements OnInit {
  createColorForm: FormGroup;
  ColorDetails:Color;
  submitted = false;
  constructor(private router: ActivatedRoute,private routerurl: Router,private fb:FormBuilder,private toastr:ToastrService,private service:ColorService) { }


  ngOnInit(): void {
    this.resetForm();
    let colorId = +this.router.snapshot.paramMap.get("id");
   if(colorId!=null)
      this.GetColorById(colorId);
  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createColorForm=this.fb.group({
        ColorID:  0, 
        ColorName  :['', Validators.required]
      }
      );
  }
  get f() { return this.createColorForm.controls; }
  onSubmit(form:FormGroup):void{
    this.submitted = true;
    if (this.createColorForm.invalid) {
        return;
    }
    this.insertRecord(form);
  }
  insertRecord(form:FormGroup)
  {
     this.service.createColorDetails(form.value).subscribe(
       res=>{
         if(res["Message"]!=null)
       this.toastr.warning(res["Message"],'Color Creation');
      else
     if(res["ColorID"]<0)
       this.toastr.error('Failed','Color Creation');
     else
     {
      this.toastr.success('Inserted Successfully','Color Creation');
      this.routerurl.navigate(['Admin/Color']);
     }
       },
       err=>{
         console.log(err)
         this.toastr.error('Failed','color Creation');
       }       
       );
  }  
  GetColorById(id:number)
  {
    this.service.getColorDetailsByID(id).subscribe(
      res=>{
        this.ColorDetails=res;
        this.createColorForm.patchValue(res);
      },
      err=>{
        console.log(err);
      }
    );
  }

  Cancel()
  {
    this.routerurl.navigate(['Admin/Color']);
  }
}
