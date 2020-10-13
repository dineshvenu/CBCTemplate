import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CategoryComponent } from './category/category.component';
import { SharedModule } from '../shared/shared.module';
import { CreatecategoryComponent } from './createcategory/createcategory.component';
import { CategorylistComponent } from './categorylist/categorylist.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from '../components/shared/confirmation-dialog/confirmation-dialog.component';
import { CourselistComponent } from './courselist/courselist.component';
import { CreatecourseComponent } from './createcourse/createcourse.component';
import { CreatesubcategoryComponent } from './createsubcategory/createsubcategory.component';
import { SubcategorylistComponent } from './subcategorylist/subcategorylist.component';
import { MatSelectModule } from '@angular/material/select';
import { ClientcategorylistComponent } from './clientcategorylist/clientcategorylist.component';
import { CreateclientcategoryComponent } from './createclientcategory/createclientcategory.component';
import { CreateclientdetailsComponent } from './createclientdetails/createclientdetails.component';
import { ClientdetailsListComponent } from './clientdetails-list/clientdetails-list.component';
import { FormsModule } from '@angular/forms';
import { AutherComponent } from './auther/auther.component';
import { PublisherComponent } from './publisher/publisher.component';
import { CreatepublisherComponent } from './createpublisher/createpublisher.component';
import { CteateautherComponent } from './cteateauther/cteateauther.component';
import { CoverComponent } from './cover/cover.component';
import { CreatecoverComponent } from './createcover/createcover.component';
import { LanguageComponent } from './language/language.component';
import { CreateLanguageComponent } from './create-language/create-language.component';
import { CreateColorComponent } from './create-color/create-color.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { ColorComponent } from './color/color.component';
import { CompanyComponent } from './company/company.component';
import { UnitCategorylistComponent } from './unit-categorylist/unit-categorylist.component';
import { CreateUnitCategoryComponent } from './create-unit-category/create-unit-category.component';
import { CreateUnitComponent } from './create-unit/create-unit.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { CreateuserComponent } from './user/createuser/createuser.component';
import { UserlistComponent } from './user/userlist/userlist.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';




@NgModule({
  declarations: [AdminComponent, CategoryComponent, CreatecategoryComponent, CategorylistComponent, CourselistComponent, CreatecourseComponent, CreatesubcategoryComponent, SubcategorylistComponent, ClientcategorylistComponent, CreateclientcategoryComponent, CreateclientdetailsComponent, ClientdetailsListComponent, AutherComponent, PublisherComponent, CreatepublisherComponent, CteateautherComponent, CoverComponent, CreatecoverComponent, LanguageComponent, CreateLanguageComponent, CreateColorComponent, CreateCompanyComponent, ColorComponent, CompanyComponent, UnitCategorylistComponent, CreateUnitCategoryComponent, CreateUnitComponent, UnitListComponent, CreateuserComponent, UserlistComponent, UserProfileComponent],
  imports: [
    AdminRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: []
})
export class AdminModule { }
