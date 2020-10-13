import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientDetails } from 'src/app/shared/client-details.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subcategory } from 'src/app/shared/subcategory.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientdetailsService } from 'src/app/shared/clientdetails.service';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-clientdetails-list',
  templateUrl: './clientdetails-list.component.html',
  styleUrls: ['./clientdetails-list.component.css']
})
export class ClientdetailsListComponent implements OnInit {
  displayedColumns: string[] = [ 'ClientCode', 'ClientName', 'ClientContactNo','ClientEmailID','ClientCategoryName','action'];
  dataSource: MatTableDataSource<ClientDetails>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  clientDetails: ClientDetails[] = [];
  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:ClientdetailsService) { }


  ngOnInit(): void {
    this.RefreshClient();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createClient():void{
    this.router.navigate(['Admin/CreateClientDetails']);
  }
  RefreshClient()
  { 
        this.dataSource = new MatTableDataSource<ClientDetails>(this.clientDetails);
        this.service.getClientDetails().subscribe((client) => {this.dataSource.data = client;});
        console.log(this.dataSource.data);
   }
  editClient(action,obj): void {
    this.router.navigate(['Admin/EditClientDetails',obj.ID]);
  };
  deleteClient(action,obj): void {
    this.service.DeleteClientDetails(obj.ID).subscribe(res=>{
      
      this.toastr.warning('Deleted Successfully','Client Deletion');
      this.RefreshClient();       
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
        this.deleteClient(action,obj);
      }
    });
  }

}
