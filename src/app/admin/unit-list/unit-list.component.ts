import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Unit } from 'src/app/shared/unit.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UnitService } from 'src/app/shared/unit.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {
  displayedColumns: string[] = ['UnitCatogory','UnitName','UnitCatogoryRelation', 'action'];
  dataSource: MatTableDataSource<Unit>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  unitCategory: Unit[] = [];
  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:UnitService) { }

  ngOnInit(): void {
    this.RefreshUnit();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createUnit():void{
    this.router.navigate(['Admin/CreateUnit']);
  }
  RefreshUnit()
  { 
        this.dataSource = new MatTableDataSource<Unit>(this.unitCategory);
        this.service.getUnitDetails().subscribe((unit) => {this.dataSource.data = unit;});
  }
  editUnit(action,obj): void {
    this.router.navigate(['Admin/EditUnit',obj.UnitID]);
  };
  deleteUnit(action,obj): void {
    this.service.DeleteUnit(obj.UnitID).subscribe(res=>{
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
