import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/shared/category.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryService } from 'src/app/shared/category.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {
  
  displayedColumns: string[] = ['CategoryCode','categoryName','action'];
  dataSource: MatTableDataSource<Category>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  categories: Category[] = [];

  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:CategoryService) { }

  ngOnInit(): void {
    this.RefreshCategory();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createCategory():void{
    window.localStorage.removeItem("editCategoryId");
    this.router.navigate(['Admin/CreateCategory']);
  }
  RefreshCategory()
  { 
        this.dataSource = new MatTableDataSource<Category>(this.categories);
        this.service.getCategoryDetails().subscribe((categoties) => {this.dataSource.data = categoties;});
  }
  editCategory(action,obj): void {
    window.localStorage.removeItem("editCategoryId");
    window.localStorage.setItem("editCategoryId", obj.categoryID.toString());
    this.router.navigate(['Admin/EditCategory',obj.categoryID]);
  };
  deleteCategory(action,obj): void {
    this.service.DeleteCategory(obj.categoryID).subscribe(res=>{
      this.toastr.warning('Deleted Successfully','Category Deletion');
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
