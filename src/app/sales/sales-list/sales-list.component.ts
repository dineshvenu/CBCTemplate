import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Sales } from 'src/app/shared/Sales/sales.model';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SalesService } from 'src/app/shared/Sales/sales.service';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {
  displayedColumns: string[] = ['InvoiceNo','ID', 'CustomerName','TotalAmount','InvoiceDate','action'];
  dataSource: MatTableDataSource<Sales>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  SalesList: Sales[] = [];

  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:SalesService) { }


  ngOnInit(): void {
    console.log("ngOnInit()");
    this.RefreshSales();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createSales():void{
    this.router.navigate(['Sales/CreateSales']);
  }
  RefreshSales()
  { 
        this.dataSource = new MatTableDataSource<Sales>(this.SalesList);
        this.service.getSalesDetails().subscribe((sales) => {this.dataSource.data = sales;console.log(sales)});
  }
  editSales(action,obj): void {
    this.router.navigate(['Sales/EditSales',obj.ID]);
  };
  deleteSales(action,obj): void {
    this.service.DeleteSalesDetails(obj.ID).subscribe(res=>{
      this.toastr.warning('Deleted Successfully','Sales Deletion');
      this.RefreshSales();       
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
        this.deleteSales(action,obj);
      }
    });
  }

}
