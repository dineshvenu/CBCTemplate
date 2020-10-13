import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(private router:Router, private fb:FormBuilder,private toastr:ToastrService, public matDialog: MatDialog,public dialogRef: MatDialogRef<LoginComponent>,private userService:UserDetailsService){}

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null)
    this.router.navigateByUrl('user/home');
    this.resetForm();
  } 
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.loginForm=this.fb.group({
        UserName: ['',Validators.required],
        Password:  ['',Validators.required]  
      });
  }
  get f() { return this.loginForm.controls; }
 
  Login(form:FormGroup)
  {     
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.login(form.value).subscribe(
      (res:any)=>
      {
        if(res.currentUser.token!=undefined)
        {
          localStorage.setItem('token',res.currentUser.token);
          this.userService.storeRole(res.currentUser);
        }
        this.close();
        this.router.navigateByUrl('user/home');
      },
      err=>{
        this.toastr.error('Incorrect User name or Password','Authentication Failed');
        console.log(err)} 
      );
      
   }
  close() {
    this.dialogRef.close("Thanks for using me!");
  }
  CreateUserModel()
  {
   // this.dialogRef.close("Thanks for using me!");
    const logindialogConfig = new MatDialogConfig();
    logindialogConfig.disableClose = true;
    logindialogConfig.id = "modal-component1";
    logindialogConfig.height = "650px";
    logindialogConfig.width = "500px";
    const loginmodalDialog = this.matDialog.open(CreateEmployeeComponent, logindialogConfig);
  }

}
