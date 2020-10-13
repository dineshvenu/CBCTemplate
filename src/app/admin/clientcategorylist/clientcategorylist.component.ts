import { Component, OnInit, ViewChild } from '@angular/core';
import { Clientcategory } from 'src/app/shared/clientcategory.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientcategoryService } from 'src/app/shared/clientcategory.service';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-clientcategorylist',
  templateUrl: './clientcategorylist.component.html',
  styleUrls: ['./clientcategorylist.component.css']
})
export class ClientcategorylistComponent implements OnInit {
  displayedColumns: string[] = ['clientCategory','action'];
  dataSource: MatTableDataSource<Clientcategory>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  clientCategory: Clientcategory[] = [];
  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:ClientcategoryService) { }

  ngOnInit(): void {
    this.RefreshCategory();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createCategory():void{
    this.router.navigate(['Admin/CreateClientcategory']);
  }
  RefreshCategory()
  { 
        this.dataSource = new MatTableDataSource<Clientcategory>(this.clientCategory);
        this.service.getClientCategoryDetails().subscribe((clientcategory) => {this.dataSource.data = clientcategory;});
  }
  editCategory(action,obj): void {
    this.router.navigate(['Admin/EditClientcategory',obj.clientCategoryID]);
  };
  deleteCategory(action,obj): void {
    this.service.DeleteClientCategory(obj.clientCategoryID).subscribe(res=>{
      
      this.toastr.warning('Deleted Successfully','client category Deletion');
      this.RefreshCategory();       
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
        this.deleteCategory(action,obj);
      }
    });
  }

}
