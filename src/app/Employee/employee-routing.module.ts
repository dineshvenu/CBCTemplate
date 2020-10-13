import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [  
  {
    path:'user',  children:[
        {   path:'',component:HomeComponent},
        {   path:'home',component:HomeComponent},
        {   path:'registration',component:CreateEmployeeComponent},
        {   path:'login',component:LoginComponent}
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
