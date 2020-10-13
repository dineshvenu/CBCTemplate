import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Color } from 'src/app/shared/color.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/shared/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  displayedColumns: string[] = [ 'ColorName','action'];
  dataSource: MatTableDataSource<Color>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  Colores: Color[] = [];
  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:ColorService) { }

  ngOnInit(): void {
    this.RefreshColor();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createColor():void{
    this.router.navigate(['Admin/CreateColor']);
  }
  RefreshColor()
  { 
        this.dataSource = new MatTableDataSource<Color>(this.Colores);
        this.service.getColorDetails().subscribe((Color) => {this.dataSource.data = Color;});
  }
  editColor(action,obj): void {
    
    this.router.navigate(['Admin/EditColor',obj.ColorID]);
  };
  deleteColor(action,obj): void {
    this.service.DeleteColorDetails(obj.ColorID).subscribe(res=>{
      
      this.toastr.warning('Deleted Successfully','Color Deletion');
      this.RefreshColor();       
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
        this.deleteColor(action,obj);
      }
    });
  }

}
