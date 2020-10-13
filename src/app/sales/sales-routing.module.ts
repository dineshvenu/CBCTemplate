import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CreatesalesComponent } from './createsales/createsales.component';
import { SalesListComponent } from './sales-list/sales-list.component';

const routes: Routes = [
  { path:'sales',component:SalesListComponent,canActivate:[AuthGuard]},  
  { path:'CreateSales',component:CreatesalesComponent,canActivate:[AuthGuard] },
  { path:'EditSales/:id',component:CreatesalesComponent,canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
