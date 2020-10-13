import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from 'src/app/shared/course.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/shared/course.service';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {
  displayedColumns: string[] = ['courseName','action'];
  dataSource: MatTableDataSource<Course>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  courses: Course[] = [];
  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:CourseService) { }

  ngOnInit(): void {
    this.RefreshCourse();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createCourse():void{
    window.localStorage.removeItem("editCourseId");
    this.router.navigate(['Admin/CreateCourse']);
  }
  RefreshCourse()
  { 
        this.dataSource = new MatTableDataSource<Course>(this.courses);
        this.service.getCourseDetails().subscribe((courses) => {this.dataSource.data = courses;});
  }
  editCourse(action,obj): void {
    
    this.router.navigate(['Admin/EditCourse',obj.id]);
  };
  deleteCategory(action,obj): void {
    this.service.DeleteCourse(obj.id).subscribe(res=>{
      
      this.toastr.warning('Deleted Successfully','Course Deletion');
      this.RefreshCourse();       
    } );
  };
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        this.deleteCategory(action,obj);
      }
    });
  }

}
