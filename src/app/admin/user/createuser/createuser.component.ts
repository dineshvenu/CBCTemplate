import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDetails } from 'src/app/shared/user-details.model';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  createUserForm: FormGroup;
  submitted = false;
  userDetails:UserDetails;
  constructor(private router: ActivatedRoute,private routerurl: Router,private fb:FormBuilder,private toastr:ToastrService,private userService:UserDetailsService){}

  ngOnInit(): void {
    let id = +this.router.snapshot.paramMap.get("id");
   if(id!=null)
    this.getUserDetailsByID(id)
    this.resetForm();
  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createUserForm=this.fb.group({ 
        ID:  0,         
        firstName: ['',Validators.required],   
        lastName: ['',Validators.required], 
        mobileNo: ['',Validators.required], 
        emailId: ['',Validators.email], 
        UserName: ['',Validators.email],
        Password :['',Validators.email]
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
  Cancel()
  {
    this.routerurl.navigate(['Admin/User']);
  }

}
