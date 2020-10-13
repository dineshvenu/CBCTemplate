import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkSchedul } from '../shared/work-schedul.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkscheduleService } from '../shared/workschedule.service';
import { UserDetails } from 'src/app/shared/user-details.model';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;
// export const MY_FORMATS = {
// parse: {
//   dateInput: 'LL',
// },
// display: {
//   dateInput: 'YYYY-MM-DD',
//   monthYearLabel: 'YYYY',
//   dateA11yLabel: 'LL',
//   monthYearA11yLabel: 'YYYY',
//  },
// };


@Component({
  selector: 'app-create-work-schedule',
  templateUrl: './create-work-schedule.component.html',
  styleUrls: ['./create-work-schedule.component.css'],
  // providers: [
  //   { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  
  //   { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  // ],
})
export class CreateWorkScheduleComponent implements OnInit {
  //@ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
  createWSForm: FormGroup;
  WS:WorkSchedul;
  submitted = false;
  user:any;
  public userRoles: string[] ;
  UserID:string="";
  UserName:string="";
  DODDate:Date;
  
  constructor(private router: ActivatedRoute,private fb:FormBuilder,private toastr:ToastrService,private service:WorkscheduleService) { }

  ngOnInit(): void {
    
    this.resetForm();
    this.userRoles=JSON.parse( localStorage.getItem('role')); 
    this.UserID=this.userRoles["ID"];
    this.UserName=this.userRoles["firstName"]+" "+this.userRoles["lastName"];
    let Id = +this.router.snapshot.paramMap.get("id");
   if(Id!=0)
      this.GetWSById(Id);
  }
  resetForm(form? : FormGroup){
   // var userRoles: string[] = JSON.parse( localStorage.getItem('role')); 
    if(form!=null)
      form.reset();
      this.createWSForm=this.fb.group({
        ID:0,
        DateOfDuty:  [''], 
        UserID  :[''],
        WayBillNo: [''],         
        NatureofDuty: [''],       
        WeeklyOff: [''],      
        Remarks: ['']
      }
      );
  }
  get f() { return this.createWSForm.controls; }
  onSubmit(form:FormGroup):void{
    this.submitted = true;
    if (this.createWSForm.invalid) {
        return;
    }
    this.insertRecord(form);
  }
  insertRecord(form:FormGroup)
  {
     this.service.createWorkSchedul(form.value).subscribe(
       res=>{
         this.toastr.success('Inserted Successfully','work schedule Details');
       },
       err=>{
         console.log(err)
         this.toastr.error('Failed','work schedule Creation');
       }       
       );
  }  
  GetWSById(id:number)
  {
    this.service.getWorkSchedulByID(id).subscribe(
      res=>{
        this.WS=res;
        res.DateOfDuty=new Date(res.DateOfDuty);
        this.createWSForm.patchValue(res);
      },
      err=>{
        console.log(err);
      }
    );
  }

}

