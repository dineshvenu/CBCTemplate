import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalComponent } from './personal.component';
import { WorkScheduleListComponent } from './work-schedule-list/work-schedule-list.component';
import { CreateWorkScheduleComponent } from './create-work-schedule/create-work-schedule.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [ 
{ path:'WorkSchedule',component:WorkScheduleListComponent,canActivate:[AuthGuard]},  
{ path:'CreateWorkSchedule',component:CreateWorkScheduleComponent,canActivate:[AuthGuard] },
{ path:'EditWorkSchedule/:id',component:CreateWorkScheduleComponent,canActivate:[AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
