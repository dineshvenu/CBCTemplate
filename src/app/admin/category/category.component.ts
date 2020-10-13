import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
categoryDetails;
  constructor(private service:CategoryService) { }

  ngOnInit(): void {
    this.service.getCategoryDetails().subscribe(
      res=>{
        this.categoryDetails=res;
      },
      err=>{
        console.log(err);
      }
    );

  }

}
