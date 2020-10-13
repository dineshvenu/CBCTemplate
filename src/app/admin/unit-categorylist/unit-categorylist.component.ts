import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { UnitCategory } from 'src/app/shared/unit-category.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UnitCategoryService } from 'src/app/shared/unit-category.service';

@Component({
  selector: 'app-unit-categorylist',
  templateUrl: './unit-categorylist.component.html',
  styleUrls: ['./unit-categorylist.component.css']
})
export class UnitCategorylistComponent implements OnInit {
  displayedColumns: string[] = ['UnitCatogory','Rate', 'action'];
  dataSource: MatTableDataSource<UnitCategory>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  unitCategory: UnitCategory[] = [];
  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:UnitCategoryService) { }

  ngOnInit(): void {
    this.RefreshUnit();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createUnit():void{
    this.router.navigate(['Admin/CreateUnitCategory']);
  }
  RefreshUnit()
  { 
        this.dataSource = new MatTableDataSource<UnitCategory>(this.unitCategory);
        this.service.getUnitCategoryDetails().subscribe((unit) => {this.dataSource.data = unit;});
  }
  editUnit(action,obj): void {
    this.router.navigate(['Admin/EditUnitCategory',obj.UnitCatogoryID]);
  };
  deleteUnit(action,obj): void {
    this.service.DeleteUnitCategory(obj.UnitID).subscribe(res=>{
      this.toastr.warning('Deleted Successfully','Unit Deletion');
      this.RefreshUnit();       
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
        this.deleteUnit(action,obj);
      }
    });
  }

}
