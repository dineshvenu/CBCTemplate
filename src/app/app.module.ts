import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { EmployeeModule } from './Employee/employee.module';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UsepopupComponent } from './components/shared/usepopup/usepopup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { InventoryModule } from './inventory/inventory.module';
import{SalesModule} from './sales/sales.module';
import { WorkscheduleListComponent } from './workschedule/workschedule-list/workschedule-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    UsepopupComponent,
    WorkscheduleListComponent
  ],
  imports: [
    BrowserModule,  
    EmployeeModule,
    AdminModule,
    InventoryModule,
    SalesModule,
    AppRoutingModule,  
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule ,
    MatIconModule,
    MatTableModule ,    
    MatPaginatorModule,
  ],entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [
    {
      
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
