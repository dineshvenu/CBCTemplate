import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserDetails } from 'src/app/shared/user-details.model';
import { UserDetailsService } from 'src/app/shared/user-details.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  createUserForm: FormGroup;
  submitted = false;
  userDetails:UserDetails;
  constructor(private fb:FormBuilder,private toastr:ToastrService,private userService:UserDetailsService){}

  ngOnInit(): void {
    alert('Hi');
    var userRoles: string[] = JSON.parse( localStorage.getItem('role')); 
    console.log(localStorage.getItem('role'));
    console.log(userRoles["ID"]);
    var id=userRoles["ID"];
    this.getUserDetailsByID(id)
    this.resetForm();
  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createUserForm=this.fb.group({        
        firstName: ['',Validators.required],   
        lastName: ['',Validators.required],  
        gender:['',Validators.required],
        mobileNo: ['',Validators.required], 
        emailId: ['',Validators.email]
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
      },
      err=>{
        console.log(err)
        this.toastr.error('Failed','User Creation');
      }       
      );
  }  
  getUserDetailsByID(id:number)
  {
    this.userService.getUserDetailsByID(id).subscribe(
      res=>{
        console.log(res);
        this.createUserForm.patchValue(res);
      },
      err=>{
        console.log(err);
      }
    );
  }
}
