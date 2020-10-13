import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalComponent } from './personal.component';
import { WorkScheduleListComponent } from './work-schedule-list/work-schedule-list.component';
import { CreateWorkScheduleComponent } from './create-work-schedule/create-work-schedule.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatAutocompleteModule, MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete';
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from "@angular/material-moment-adapter";
import { MomentUtcDateAdapter } from './shared/moment-utc-date-adapter';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
  declarations: [PersonalComponent, WorkScheduleListComponent, CreateWorkScheduleComponent],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    FormsModule, 
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule ,
    MatMomentDateModule,
    MatNativeDateModule,
    MatAutocompleteModule,    
    MatTableExporterModule,
  ],
  providers: [
    {provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, useValue: {autoActiveFirstOption: false}},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
  ]
})
export class PersonalModule { }
