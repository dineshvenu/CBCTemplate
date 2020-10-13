import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { StockComponent } from './stock/stock.component';
import { CreatestockComponent } from './createstock/createstock.component';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CreateInvebtoryComponent } from './create-invebtory/create-invebtory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { CreatePurchaseComponent } from './create-purchase/create-purchase.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { MatAutocompleteModule, MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MomentUtcDateAdapter } from '../personal/shared/moment-utc-date-adapter';


@NgModule({
  declarations: [InventoryComponent, StockComponent, CreatestockComponent, CreateInvebtoryComponent, InventoryListComponent, CreatePurchaseComponent, PurchaseListComponent],
  imports: [    
    CommonModule,
    InventoryRoutingModule,    
    FormsModule, 
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule ,
    MatNativeDateModule,
    MatAutocompleteModule
  ],
  providers: [
    {provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, useValue: {autoActiveFirstOption: false}},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
  ]
})
export class InventoryModule { }
