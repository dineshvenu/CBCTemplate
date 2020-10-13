import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cover } from 'src/app/shared/cover.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoverService } from 'src/app/shared/cover.service';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'CoverType', 'Price','action'];
  dataSource: MatTableDataSource<Cover>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  Covers: Cover[] = [];

  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:CoverService) { }


  ngOnInit(): void {
    this.RefreshCover();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createCover():void{
    this.router.navigate(['Admin/CreateCover']);
  }
  RefreshCover()
  { 
        this.dataSource = new MatTableDataSource<Cover>(this.Covers);
        this.service.getCoverDetails().subscribe((Cover) => {this.dataSource.data = Cover;});
  }
  editCover(action,obj): void {
    this.router.navigate(['Admin/EditCover',obj.ID]);
  };
  deleteCover(action,obj): void {
    this.service.DeleteCoverDetails(obj.ID).subscribe(res=>{
      this.toastr.warning('Deleted Successfully','Cover Deletion');
      this.RefreshCover();       
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
        this.deleteCover(action,obj);
      }
    });
  }

}
