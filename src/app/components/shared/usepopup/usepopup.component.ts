import { Component, OnInit, Inject, Renderer2, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Userpopup } from 'src/app/shared/userpopup.model';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usepopup',
  templateUrl: './usepopup.component.html',
  styleUrls: ['./usepopup.component.css']
})
export class UsepopupComponent implements OnInit {
  displayedColumns: string[] = ['UserId','Name'];
  dataSource: MatTableDataSource<Userpopup>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  users: Userpopup[] = [];
  displayNoRecords = false;
  _value: string;
  private change = new EventEmitter<string>();
  constructor(private router: Router, private userservice:UserDetailsService,public dialogRef: MatDialogRef<UsepopupComponent>) {
    
   }

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
        this.dataSource = new MatTableDataSource<Userpopup>(this.users);
        this.userservice.getUserPopup().subscribe((user) => {
          this.dataSource.data = user;
        });
   }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onInputChange(value) {
    const valueChanged = value !== this._value;
    if (valueChanged) {
      this._value = value;
      this.change.emit(value);
    }
  }
  getRecord(user: string): void {
    this.dialogRef.close(user);
  }

  // Users: Userpopup[] = [];
  // displayedColumns: string[] = ['UserId','Name'];
  // dataSource = new MatTableDataSource(this.Users);
  // displayNoRecords = false;
  // _value: string;
  
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  // ClientCategoryName = '';
  // placeholderLabel = 'Search';
  // @ViewChild('innerSelectSearch', {read: ElementRef}) innerSelectSearch: ElementRef;
  // @ViewChild('searchSelectInput', {read: ElementRef}) searchSelectInput: ElementRef;
  // @ViewChild('itemSelection', { read: ElementRef }) itemSelection: ElementRef;

  // UserName = '';
  // private change = new EventEmitter<string>();

  // constructor(private service:UserDetailsService,
  //   public dialogRef: MatDialogRef<UsepopupComponent>,
  //   private renderer: Renderer2,
  //   @Inject(MAT_DIALOG_DATA) public data: any) {
  //    this.Users = data.users;  
  //    this.ClientCategoryName = data.UserId;  
  //   this.dataSource = new MatTableDataSource(this.Users);    
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
  
  // ngAfterViewInit() {
  //   let width = this.itemSelection.nativeElement.offsetWidth;
  //   this.renderer.setStyle(
  //       this.innerSelectSearch.nativeElement, 
  //       'width', 
  //       `${width}px`
  //     );
  // }

  // onInputChange(value) {
  //   const valueChanged = value !== this._value;
  //   if (valueChanged) {
  //     this._value = value;
  //     this.change.emit(value);
  //   }
  // }

  // private focus() {
  //   if (!this.searchSelectInput) {
  //     return;
  //   }
  //   this.searchSelectInput.nativeElement.focus();
  // }

  // public _reset(focus?: boolean) {
  //   this.searchSelectInput.nativeElement.value = '';
  //   this.onInputChange('');
  //   this.applyFilter('');
  //   this.focus();
  // }
  
  // getRecord(user: string): void {
  //   this.dialogRef.close(user);
  // }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.filteredData.length==0) {
  //     this.displayNoRecords=true;
  //   } else {
  //     this.displayNoRecords=false;
  //   }
  // }

}
