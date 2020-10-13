import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/app/shared/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/shared/course.service';

@Component({
  selector: 'app-createcourse',
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.css']
})
export class CreatecourseComponent implements OnInit {
  createCourseForm: FormGroup;
  courseDetails:Course;
  submitted = false;
  constructor(private router: ActivatedRoute,private routerurl: Router,private fb:FormBuilder,private toastr:ToastrService,private service:CourseService) { }

  ngOnInit(): void {
    this.resetForm();
     let courseId = +this.router.snapshot.paramMap.get("id");
     console.log(courseId);
    if(courseId!=null)
    this.GetCategoryById(courseId);
  }
  resetForm(form? : FormGroup){
    if(form!=null)
      form.reset();
      this.createCourseForm=this.fb.group({
        id:  0,  
        courseName  :['', Validators.required]
      }
      );
  }
  get f() { return this.createCourseForm.controls; }
  onSubmit(form:FormGroup):void{
    this.submitted = true;
    if (this.createCourseForm.invalid) {
        return;
    }
    this.insertRecord(form);
  }
  insertRecord(form:FormGroup)
  {
     this.service.createCourse(form.value).subscribe(
       res=>{
        if(res["Message"]!=null)
        this.toastr.warning(res["Message"],'Course Creation');
       else
      if(res["id"]<0)
        this.toastr.error('Failed','Course Creation');
      else
      {
        this.toastr.success('Inserted Successfully','Course Creation');;
       this.routerurl.navigate(['Admin/Courselist']);
      }
         
       },
       err=>{
         console.log(err)
         this.toastr.error('Failed','Course Creation');
       }       
       );
  }  
  GetCategoryById(id:number)
  {
    this.service.getCourseByID(id).subscribe(
      res=>{
        this.courseDetails=res;
        this.createCourseForm.patchValue(res);
      },
      err=>{
        console.log(err);
      }
    );
  }
  Cancel()
  {
    this.routerurl.navigate(['Admin/Courselist']);
  }

}
