import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from 'src/app/shared/company.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/shared/company.service';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  displayedColumns: string[] = ['CompanyName','action'];
  dataSource: MatTableDataSource<Company>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  Companies: Company[] = [];
  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:CompanyService) { }

  ngOnInit(): void {
    this.RefreshCompany();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createCompany():void{
    this.router.navigate(['Admin/CreateCompany']);
  }
  RefreshCompany()
  { 
        this.dataSource = new MatTableDataSource<Company>(this.Companies);
        this.service.getCompanyDetails().subscribe((company) => {this.dataSource.data = company;});
  }
  editCompany(action,obj): void {
    
    this.router.navigate(['Admin/EditCompany',obj.CompanyID]);
  };
  deleteColor(action,obj): void {
    this.service.DeleteCompanyDetails(obj.CompanyID).subscribe(res=>{
      
      this.toastr.warning('Deleted Successfully','Company Deletion');
      this.RefreshCompany();       
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
