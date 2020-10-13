import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatestockComponent } from './createstock/createstock.component';
import { AuthGuard } from '../auth/auth.guard';
import { StockComponent } from './stock/stock.component';
import { CreateInvebtoryComponent } from './create-invebtory/create-invebtory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { CreatePurchaseComponent } from './create-purchase/create-purchase.component';

const routes: Routes = [
  { path:'Stock',component:StockComponent,canActivate:[AuthGuard] },  
  { path:'CreateStock',component:CreatestockComponent,canActivate:[AuthGuard] },
  { path:'EditStock/:id',component:CreatestockComponent,canActivate:[AuthGuard] },
  { path:'Inventory',component:InventoryListComponent,canActivate:[AuthGuard] },  
  { path:'CreateInventory',component:CreateInvebtoryComponent,canActivate:[AuthGuard] },
  { path:'EditInventory/:id',component:CreateInvebtoryComponent,canActivate:[AuthGuard] },
  { path:'Purchase',component:PurchaseListComponent,canActivate:[AuthGuard] },  
  { path:'CreatePurchase',component:CreatePurchaseComponent,canActivate:[AuthGuard] },
  { path:'EditPurchase/:id',component:CreatePurchaseComponent,canActivate:[AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
