import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WorkSchedul } from '../shared/work-schedul.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkscheduleService } from '../shared/workschedule.service';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-work-schedule-list',
  templateUrl: './work-schedule-list.component.html',
  styleUrls: ['./work-schedule-list.component.css']
})
export class WorkScheduleListComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'DateOfDuty','WayBillNo','NatureofDuty','WeeklyOff','Remarks', 'action'];
  dataSource: MatTableDataSource<WorkSchedul>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  workschedule: WorkSchedul[] = [];
  renderedData: any;
  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:WorkscheduleService) { 
    this.dataSource = new MatTableDataSource(this.workschedule);
    this.dataSource.connect().subscribe(d => this.renderedData = d);
  }

  ngOnInit(): void {
    this.RefreshWS();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createWS():void{
    this.router.navigate(['Personal/CreateWorkSchedule']);
  }
  RefreshWS()
  { 
        this.dataSource = new MatTableDataSource<WorkSchedul>(this.workschedule);
        this.service.getWorkSchedul().subscribe((unit) => {this.dataSource.data = unit;});
  }
  editWS(action,obj): void {
    this.router.navigate(['Personal/EditWorkSchedule',obj.ID]);
  };
  deleteUnit(action,obj): void {
    this.service.DeleteWorkSchedul(obj.ID).subscribe(res=>{
      this.toastr.warning('Deleted Successfully','WS Deletion');
      this.RefreshWS();       
    } );
  };
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  exportCsv(){
    //new Angular5Csv(this.renderedData,'Test Report');
    }
  openDialog(action,obj): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the deletion of this data?"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        console.log('Yes clicked');
        this.deleteUnit(action,obj);
      }
    });
  }

}
