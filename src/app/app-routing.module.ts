import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmployeeComponent } from './Employee/create-employee/create-employee.component';
import { HomeComponent } from './Employee/home/home.component';
import { LoginComponent } from './Employee/login/login.component';

const routes: Routes = [  
  { path:'',redirectTo:'user/home',pathMatch:'full'},
  { path: 'Admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule) },
  { path: 'Sales', loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule) },
  { path: 'Personal', loadChildren: () => import('./personal/personal.module').then(m => m.PersonalModule) },  
  { path: 'no-access', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
