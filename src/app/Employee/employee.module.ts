import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule , MatDialogRef} from '@angular/material/dialog';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';

import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { LoginComponent } from './login/login.component';

import { UserDetailsService } from '../shared/user-details.service';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {EmployeeRoutingModule} from './employee-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CreateEmployeeComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,   
    ToastrModule.forRoot(),
    HttpClientModule,
    EmployeeRoutingModule,
    SharedModule
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  },UserDetailsService]
})
export class EmployeeModule { }
