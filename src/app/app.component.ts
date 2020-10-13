import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateEmployeeComponent } from './Employee/create-employee/create-employee.component';
import { LoginComponent } from './Employee/login/login.component';
import { UserDetailsService } from './shared/user-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router,public matDialog: MatDialog,public userService:UserDetailsService){}
  title = 'CbcUI';  
  isLoggedIn:boolean=false;
  CreateUserModel()
  { 
    const logindialogConfig = new MatDialogConfig();
    logindialogConfig.disableClose = true;
    logindialogConfig.id = "modal-component";
    logindialogConfig.height = "650px";
    logindialogConfig.width = "500px";
    const loginmodalDialog = this.matDialog.open(LoginComponent, logindialogConfig);
  }
  LogOut()
  {
    this.isLoggedIn=false;
    this.userService.removeToken();
    this.userService.removeRole();
    this.router.navigate(['user/home']);
  }
}
