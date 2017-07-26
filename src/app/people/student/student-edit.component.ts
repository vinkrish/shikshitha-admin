import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Student }           from './student';
import { StudentService }    from './student.service';
import { Gender }            from '../../shared/gender';
import { CookieService }     from 'angular2-cookie/core';

@Component({
  selector: 'ui-student-detail',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})

export class StudentEditComponent implements OnInit, OnDestroy {
  student: Student;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false;
  genders = [
    new Gender("M"),
    new Gender("F")
  ];
  className: string = this.cookieService.get("className");
  classId: number = +this.cookieService.get("classId");
  sectionName: string = this.cookieService.get("sectionName");
  sectionId: number = +this.cookieService.get("sectionId");

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private studentService: StudentService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let studentId = +params['id'];
        this.navigated = true;
        this.studentService.getStudent(this.sectionId, studentId)
          .then(student => {
            this.student = student;
          });
      } else {
        this.navigated = false;
        this.student = new Student();
        this.student.schoolId = +this.cookieService.get("schoolId");
        this.student.classId = this.classId;
        this.student.sectionId = this.sectionId;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.studentService
      .save(this.student)
      .then(student => {
        this.student = student;
        this.goBack(student);
      })
      .catch(error => this.error = error);
  }

  goBack(savedStudent: Student = null) {
    this.close.emit(savedStudent);
    if (this.navigated) { window.history.back(); }
  }

}