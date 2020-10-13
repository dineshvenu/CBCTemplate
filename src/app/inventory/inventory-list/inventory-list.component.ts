import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Inventory } from 'src/app/shared/Inventory/inventory.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from 'src/app/shared/Inventory/inventory.service';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  displayedColumns: string[] = ['ProductName', 'StockQty','action'];
  dataSource: MatTableDataSource<Inventory>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  InventoryList: Inventory[] = [];

  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:InventoryService) { }


  ngOnInit(): void {
    this.RefreshInventory();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createInventory():void{
    this.router.navigate(['inventory/CreateInventory']);
  }
  RefreshInventory()
  { 
        this.dataSource = new MatTableDataSource<Inventory>(this.InventoryList);
        this.service.getInventoryDetails().subscribe((Inventory) => {this.dataSource.data = Inventory;});
  }
  editInventory(action,obj): void {
    this.router.navigate(['inventory/EditInventory',obj.ID]);
  };
  deleteInventory(action,obj): void {
    this.service.DeleteInventory(obj.ID).subscribe(res=>{
      this.toastr.warning('Deleted Successfully','Inventory Deletion');
      this.RefreshInventory();       
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
        this.deleteInventory(action,obj);
      }
    });
  }

}
