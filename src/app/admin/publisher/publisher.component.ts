import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Publisher } from 'src/app/shared/publisher.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PublisherService } from 'src/app/shared/publisher.service';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {
  displayedColumns: string[] = ['PublisherName','action'];
  dataSource: MatTableDataSource<Publisher>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  Publishers: Publisher[] = [];

  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:PublisherService) { }


  ngOnInit(): void {
    this.RefreshPublisher();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createPublisher():void{
    this.router.navigate(['Admin/CreatePublisher']);
  }
  RefreshPublisher()
  { 
        this.dataSource = new MatTableDataSource<Publisher>(this.Publishers);
        this.service.getPublisherDetails().subscribe((Publisher) => {this.dataSource.data = Publisher;});
  }
  editPublisher(action,obj): void {
    this.router.navigate(['Admin/EditPublisher',obj.PblisherID]);
  };
  deletePublisher(action,obj): void {
    this.service.DeletePublisherDetails(obj.PblisherID).subscribe(res=>{
      this.toastr.warning('Deleted Successfully','PblisherID Deletion');
      this.RefreshPublisher();       
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
        this.deletePublisher(action,obj);
      }
    });
  }

}
