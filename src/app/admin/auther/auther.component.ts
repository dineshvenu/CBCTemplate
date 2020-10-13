import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Auther } from 'src/app/shared/auther.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutherService } from 'src/app/shared/auther.service';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-auther',
  templateUrl: './auther.component.html',
  styleUrls: ['./auther.component.css']
})
export class AutherComponent implements OnInit {
  displayedColumns: string[] = ['AutherName','action'];
  dataSource: MatTableDataSource<Auther>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  Authers: Auther[] = [];

  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:AutherService) { }


  ngOnInit(): void {
    this.RefreshAuther();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createAuther():void{
    this.router.navigate(['Admin/CreateAuther']);
  }
  RefreshAuther()
  { 
        this.dataSource = new MatTableDataSource<Auther>(this.Authers);
        this.service.getAutherDetails().subscribe((Authers) => {this.dataSource.data = Authers;});
  }
  editAuthers(action,obj): void {
    this.router.navigate(['Admin/EditAuther',obj.AutherID]);
  };
  deleteCategory(action,obj): void {
    this.service.DeleteAutherDetails(obj.AutherID).subscribe(res=>{
      this.toastr.warning('Deleted Successfully','Auther Deletion');
      this.RefreshAuther();       
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
