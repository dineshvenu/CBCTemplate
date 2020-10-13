import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subcategory } from 'src/app/shared/subcategory.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Course } from 'src/app/shared/course.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubcategoryService } from 'src/app/shared/subcategory.service';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-subcategorylist',
  templateUrl: './subcategorylist.component.html',
  styleUrls: ['./subcategorylist.component.css']
})
export class SubcategorylistComponent implements OnInit {
  displayedColumns: string[] = ['subCatCode', 'catogoryName', 'description','action'];
  dataSource: MatTableDataSource<Subcategory>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  subCategory: Subcategory[] = [];
  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:SubcategoryService) { }

  ngOnInit(): void {
    this.RefreshCategory();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createCategory():void{
    this.router.navigate(['Admin/CreateSubcategory']);
  }
  RefreshCategory()
  { 
        this.dataSource = new MatTableDataSource<Subcategory>(this.subCategory);
        this.service.getSubCategoryDetails().subscribe((Subcategory) => {this.dataSource.data = Subcategory;});
  }
  editCategory(action,obj): void {
    this.router.navigate(['Admin/EditSubcategory',obj.subCategoryID]);
  };
  deleteCategory(action,obj): void {
    this.service.DeleteSubCategory(obj.subCategoryID).subscribe(res=>{
      
      this.toastr.warning('Deleted Successfully','SubCategory Deletion');
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
