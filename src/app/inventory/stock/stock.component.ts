import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Stock } from 'src/app/shared/Inventory/stock.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StockService } from 'src/app/shared/Inventory/stock.service';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  displayedColumns: string[] = ['CategoryName', 'CommodityName','Price','TotalQty','action'];
  dataSource: MatTableDataSource<Stock>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  Stocks: Stock[] = [];

  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:StockService) { }


  ngOnInit(): void {
    this.RefreshStock();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createStock():void{
    this.router.navigate(['inventory/CreateStock']);
  }
  RefreshStock()
  { 
        this.dataSource = new MatTableDataSource<Stock>(this.Stocks);
        this.service.getStockDetails().subscribe((Stock) => {this.dataSource.data = Stock;});
  }
  editStock(action,obj): void {
   // this.router.navigate(['Sales/CreateSales']);
    this.router.navigate(['inventory/EditStock',obj.ID]);
  };
  deleteStock(action,obj): void {
    this.service.DeleteStockDetails(obj.ID).subscribe(res=>{
      this.toastr.warning('Deleted Successfully','Stock Deletion');
      this.RefreshStock();       
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
        this.deleteStock(action,obj);
      }
    });
  }

}
