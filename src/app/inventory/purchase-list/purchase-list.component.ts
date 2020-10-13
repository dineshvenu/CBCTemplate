import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { Purchase } from '../shared/purchase.model';
import { PurchaseService } from '../shared/purchase.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {
  displayedColumns: string[] = ['PuchaseNo','SupplierName', 'PurchaseDate','PurchasedAmt','BalanceAmount','action'];
  dataSource: MatTableDataSource<Purchase>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  PurchaseList: Purchase[] = [];

  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:PurchaseService) { }


  ngOnInit(): void {
    this.RefreshPurchase();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createPurchase():void{
    this.router.navigate(['inventory/CreatePurchase']);
  }
  RefreshPurchase()
  { 
        this.dataSource = new MatTableDataSource<Purchase>(this.PurchaseList);
        this.service.getPurchaseDetails().subscribe((purchase) => {this.dataSource.data = purchase;});
  }
  editPurchase(action,obj): void {
    this.router.navigate(['inventory/EditPurchase',obj.ID]);
  };
  deletePurchase(action,obj): void {
    this.service.DeletePurchaseDetails(obj.ID).subscribe(res=>{
      this.toastr.warning('Deleted Successfully','Sales Deletion');
      this.RefreshPurchase();       
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
        this.deletePurchase(action,obj);
      }
    });
  }

}
