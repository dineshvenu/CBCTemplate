import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Language } from 'src/app/shared/language.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/shared/language.service';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  displayedColumns: string[] = ['Language', 'action'];
  dataSource: MatTableDataSource<Language>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  Language: Language[] = [];
  constructor(public dialog: MatDialog,private router: Router,private toastr:ToastrService,private service:LanguageService) { }

  ngOnInit(): void {
    this.RefreshLanguage();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  createLanguage():void{
    this.router.navigate(['Admin/CreateLanguage']);
  }
  RefreshLanguage()
  { 
        this.dataSource = new MatTableDataSource<Language>(this.Language);
        this.service.getLanguageDetails().subscribe((Language) => {this.dataSource.data = Language;});
  }
  editLanguage(action,obj): void {
    this.router.navigate(['Admin/EditLanguage',obj.LanguageID]);
  };
  deleteLanguage(action,obj): void {
    this.service.DeleteLanguageDetails(obj.LanguageID).subscribe(res=>{
      this.toastr.warning('Deleted Successfully','Language Deletion');
      this.RefreshLanguage();       
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
