import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ClientDetails } from 'src/app/shared/client-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientdetailsService } from 'src/app/shared/clientdetails.service';
import { ToastrService } from 'ngx-toastr';
import { UsepopupComponent } from 'src/app/components/shared/usepopup/usepopup.component';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import { Userpopup } from 'src/app/shared/userpopup.model';
import { Observable } from 'rxjs';
import { Clientcategory } from 'src/app/shared/clientcategory.model';
import { ClientcategoryService } from 'src/app/shared/clientcategory.service';

@Component({
  selector: 'app-createclientdetails',
  templateUrl: './createclientdetails.component.html',
  styleUrls: ['./createclientdetails.component.css']
})
export class CreateclientdetailsComponent implements OnInit {
  createClientDetailsForm: FormGroup;
  ClientDetails:ClientDetails;
  submitted = false;  
  userName = '';
  UserId='';
  private users: Userpopup[] ;    
  ClientCategory:string=""; 
  public categoryList: Observable<Clientcategory[]>;
  constructor(private clientCategoryService:ClientcategoryService,private routerurl: Router, private userservice:UserDetailsService,public dialog: MatDialog,private router: ActivatedRoute,private service:ClientdetailsService,private fb:FormBuilder,private toastr:ToastrService) { }


  ngOnInit(): void {
    this.resetForm();
    //this.RefreshPopup();
    this.RefreshCategory();
    let ClientId = +this.router.snapshot.paramMap.get("id");
   if(ClientId!=null && ClientId!=0)
   this.GetClientDetailsById(ClientId);
  }
  RefreshCategory()
  { 
    this.categoryList=this.clientCategoryService.getClientCategoryDetails(); 
    console.log("catlist"+this.categoryList);
  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createClientDetailsForm=this.fb.group({
        ID:  0,  
        ClientCode:[{value:'',disabled:true}],
        ClientName:["",Validators.required],
        ClientCategory:["",Validators.required],
        ClientCategoryName:[""],
        ClientContactPersonName:[""],
        ClientContactPerson:["",Validators.required],
        ClientContactNo:["",Validators.required],
        ClientEmailID:["",Validators.required],
        clientAddess:["",Validators.required]
      }
      );
  }
  
  get f() { return this.createClientDetailsForm.controls; }
  onSubmit(form:FormGroup):void{
    this.submitted = true;
    if (this.createClientDetailsForm.invalid) {
        return;
    }
    this.insertRecord(form);
  }
  
  insertRecord(form:FormGroup)
  {
     this.service.createClientDetails(form.value).subscribe(
       res=>{
        if(res["Message"]!=null)
        this.toastr.warning(res["Message"],'Client Creation');
       else
      if(res["ID"]<0)
        this.toastr.error('Failed','Client Creation');
      else
      {
       this.toastr.success('Inserted Successfully','Client Creation');
       this.routerurl.navigate(['Admin/ClientDetailslist']);
      }
       },
       err=>{
         console.log(err)
         this.toastr.error('Failed','Client Creation');
       }       
       );
  }  
  GetClientDetailsById(id:number)
  {
    this.service.getClientDetailsByID(id).subscribe(
      res=>{
        this.ClientDetails=res;
        this.createClientDetailsForm.patchValue(res);
      },
      err=>{
        console.log(err);
      }
    );
  }
  //start
  clickUser(evt: MouseEvent) {
    const dialogRef = this.dialog.open(UsepopupComponent, {
       width: '500px',
      maxHeight: '300vh',
      panelClass: 'my-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.createClientDetailsForm.controls["ClientContactPersonName"].setValue(result.Name);
        this.createClientDetailsForm.controls["ClientContactPerson"].setValue(result.UserId);
        console.log(this.createClientDetailsForm);
      }
    });
    evt.stopPropagation();
  }
  RefreshPopup()
  {      
        this.userservice.getUserPopup().subscribe((user) => {
          this.users = user;
        });
  }
  //end
  Cancel()
  {
    this.routerurl.navigate(['Admin/ClientDetailslist']);
  }
}
