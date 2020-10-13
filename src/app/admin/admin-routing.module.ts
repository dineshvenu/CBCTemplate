import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { CategoryComponent } from './category/category.component';
import { AuthGuard } from '../auth/auth.guard';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { CreatecategoryComponent } from './createcategory/createcategory.component';
import { CourselistComponent } from './courselist/courselist.component';
import { CreatecourseComponent } from './createcourse/createcourse.component';
import { CreatesubcategoryComponent } from './createsubcategory/createsubcategory.component';
import { SubcategorylistComponent } from './subcategorylist/subcategorylist.component';
import { ClientcategorylistComponent } from './clientcategorylist/clientcategorylist.component';
import { CreateclientcategoryComponent } from './createclientcategory/createclientcategory.component';
import { ClientdetailsListComponent } from './clientdetails-list/clientdetails-list.component';
import { CreateclientdetailsComponent } from './createclientdetails/createclientdetails.component';
import { Publisher } from '../shared/publisher.model';
import { PublisherComponent } from './publisher/publisher.component';
import { CreatepublisherComponent } from './createpublisher/createpublisher.component';
import { AutherComponent } from './auther/auther.component';
import { CteateautherComponent } from './cteateauther/cteateauther.component';
import { CoverComponent } from './cover/cover.component';
import { CreatecoverComponent } from './createcover/createcover.component';
import { LanguageComponent } from './language/language.component';
import { CreateLanguageComponent } from './create-language/create-language.component';
import { ColorComponent } from './color/color.component';
import { CreateColorComponent } from './create-color/create-color.component';
import { CompanyComponent } from './company/company.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { CreateUnitComponent } from './create-unit/create-unit.component';
import { UnitCategorylistComponent } from './unit-categorylist/unit-categorylist.component';
import { CreateUnitCategoryComponent } from './create-unit-category/create-unit-category.component';
import { CreateuserComponent } from './user/createuser/createuser.component';
import { UserlistComponent } from './user/userlist/userlist.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

const routes: Routes = [  
    { path:'Categorylist',component:CategorylistComponent,canActivate:[AuthGuard] },
    { path:'CreateCategory',component:CreatecategoryComponent,canActivate:[AuthGuard] },
    { path:'EditCategory/:id',component:CreatecategoryComponent,canActivate:[AuthGuard] },
    { path:'Courselist',component:CourselistComponent,canActivate:[AuthGuard] },
    { path:'CreateCourse',component:CreatecourseComponent,canActivate:[AuthGuard] },
    { path:'EditCourse/:id',component:CreatecourseComponent,canActivate:[AuthGuard] },  
    { path:'Subcategorylist',component:SubcategorylistComponent,canActivate:[AuthGuard] },  
    { path:'CreateSubcategory',component:CreatesubcategoryComponent,canActivate:[AuthGuard] },
    { path:'EditSubcategory/:id',component:CreatesubcategoryComponent,canActivate:[AuthGuard] },
    { path:'Clientcategorylist',component:ClientcategorylistComponent,canActivate:[AuthGuard] },  
    { path:'CreateClientcategory',component:CreateclientcategoryComponent,canActivate:[AuthGuard] },
    { path:'EditClientcategory/:id',component:CreateclientcategoryComponent,canActivate:[AuthGuard] },
    { path:'ClientDetailslist',component:ClientdetailsListComponent,canActivate:[AuthGuard] },  
    { path:'CreateClientDetails',component:CreateclientdetailsComponent,canActivate:[AuthGuard] },
    { path:'EditClientDetails/:id',component:CreateclientdetailsComponent,canActivate:[AuthGuard] },
    { path:'Publisherlist',component:PublisherComponent,canActivate:[AuthGuard] },  
    { path:'CreatePublisher',component:CreatepublisherComponent,canActivate:[AuthGuard] },
    { path:'EditPublisher/:id',component:CreatepublisherComponent,canActivate:[AuthGuard] },
    { path:'Autherlist',component:AutherComponent,canActivate:[AuthGuard] },  
    { path:'CreateAuther',component:CteateautherComponent,canActivate:[AuthGuard] },
    { path:'EditAuther/:id',component:CteateautherComponent,canActivate:[AuthGuard] },
    { path:'Coverlist',component:CoverComponent,canActivate:[AuthGuard] },  
    { path:'CreateCover',component:CreatecoverComponent,canActivate:[AuthGuard] },
    { path:'EditCover/:id',component:CreatecoverComponent,canActivate:[AuthGuard] },
    { path:'Languagelist',component:LanguageComponent,canActivate:[AuthGuard] },  
    { path:'CreateLanguage',component:CreateLanguageComponent,canActivate:[AuthGuard] },
    { path:'EditLanguage/:id',component:CreateLanguageComponent,canActivate:[AuthGuard] },
    { path:'Color',component:ColorComponent,canActivate:[AuthGuard] },  
    { path:'CreateColor',component:CreateColorComponent,canActivate:[AuthGuard] },
    { path:'EditColor/:id',component:CreateColorComponent,canActivate:[AuthGuard] },
    { path:'Company',component:CompanyComponent,canActivate:[AuthGuard] },  
    { path:'CreateCompany',component:CreateCompanyComponent,canActivate:[AuthGuard] },
    { path:'EditCompany/:id',component:CreateCompanyComponent,canActivate:[AuthGuard] },
    { path:'Category',component:CategoryComponent,canActivate:[AuthGuard] },
    { path:'Unit',component:UnitListComponent,canActivate:[AuthGuard] },  
    { path:'CreateUnit',component:CreateUnitComponent,canActivate:[AuthGuard] },
    { path:'EditUnit/:id',component:CreateUnitComponent,canActivate:[AuthGuard] },
    { path:'UnitCategory',component:UnitCategorylistComponent,canActivate:[AuthGuard] },  
    { path:'CreateUnitCategory',component:CreateUnitCategoryComponent,canActivate:[AuthGuard] },
    { path:'EditUnitCategory/:id',component:CreateUnitCategoryComponent,canActivate:[AuthGuard] },
    { path:'MyProfile',component:UserProfileComponent,canActivate:[AuthGuard] },
    { path:'User',component:UserlistComponent,canActivate:[AuthGuard] },  
    { path:'CreateUser',component:CreateuserComponent,canActivate:[AuthGuard] },
    { path:'EditUser/:id',component:CreateuserComponent,canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
