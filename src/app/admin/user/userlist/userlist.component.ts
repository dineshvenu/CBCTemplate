import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { UserDetails } from 'src/app/shared/user-details.model';
import { UserDetailsService } from 'src/app/shared/user-details.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'mobileNo', 'action'];
  dataSource: MatTableDataSource<UserDetails>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  Language: UserDetails[] = [];
  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:UserDetailsService) { }

  ngOnInit(): void {
    this.RefreshUser();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createUser():void{
    this.router.navigate(['Admin/CreateUser']);
  }
  RefreshUser()
  { 
        this.dataSource = new MatTableDataSource<UserDetails>(this.Language);
        this.service.getUser().subscribe((user) => {this.dataSource.data = user;});
  }
  editLanguage(action,obj): void {
    alert(obj.ID);
    this.router.navigate(['Admin/EditUser',obj.ID]);
  };
  deleteLanguage(action,obj): void {
    this.service.DeleteUser(obj.LanguageID).subscribe(res=>{
      this.toastr.warning('Deleted Successfully','user Deletion');
      this.RefreshUser();       
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
        this.deleteLanguage(action,obj);
      }
    });
  }

}
