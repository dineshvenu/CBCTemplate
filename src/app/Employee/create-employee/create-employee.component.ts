import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { UserDetailsService } from 'src/app/shared/user-details.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  createUserForm: FormGroup;
  submitted = false;
  constructor(private fb:FormBuilder,private toastr:ToastrService, public dialogRef: MatDialogRef<CreateEmployeeComponent>,private userService:UserDetailsService){}

  ngOnInit(): void {
    this.resetForm();
  }

  close() {
    this.dialogRef.close("Thanks for using me!");
  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createUserForm=this.fb.group({
        // UserName: [''],
        Password:  ['',[Validators.required, Validators.minLength(6)]],  
        confirmPassword  :['', Validators.required],
        FirstName: ['',Validators.required],   
        LastName: ['',Validators.required],  
        Gender:['',Validators.required],
        MobileNo: ['',Validators.required], 
        EmailId: ['',Validators.email]
      }, {
        validator: MustMatch('Password', 'confirmPassword')
    }
      );
  }
  get f() { return this.createUserForm.controls; }
  onSubmit(form:FormGroup):void{
    this.submitted = true;
    if (this.createUserForm.invalid) {
        return;
    }
    this.insertRecord(form);
  }
  insertRecord(form:FormGroup)
  {
    this.userService.postUserDetails(form.value).subscribe(
      res=>{
        this.toastr.success('Inserted Successfully','User Creation');
        this.close();
      },
      err=>{
        console.log(err)
        this.toastr.error('Failed','User Creation');
      }       
      );
  }  
}
