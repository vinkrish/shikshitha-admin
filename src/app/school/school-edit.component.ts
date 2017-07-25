import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { School }            from './school';
import { SchoolService }     from './school.service';
import { Service }           from './service';
import { Teacher }           from '../people/teacher/teacher';
import { TeacherService }    from '../people/teacher/teacher.service';

@Component({
  selector: 'ui-school-detail',
  templateUrl: './school-edit.component.html',
  styleUrls: ['./school-edit.component.css']
})

export class SchoolEditComponent implements OnInit, OnDestroy {
  teachers: Teacher[];
  school: School;
  service: Service;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false;

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private schoolService: SchoolService) {
  }

  ngOnInit() {
    this.getTeachers();
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let schoolId = +params['id'];
        this.navigated = true;
        this.schoolService.getSchool(schoolId)
          .then(school => {
            this.school = school;
            this.getService();
          });
      } else {
        this.navigated = false;
        this.school = new School();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getTeachers() {
    this.teacherService
        .getTeachers()
        .then(teachers => this.teachers = teachers)
        .catch(error => this.error = error);
  }

  getService() {
    this.schoolService
        .getService(this.school.id)
        .then(service => this.service = service)
        .catch(error => this.error = error); 
  }

  save() {
    this.schoolService
      .save(this.school)
      .then(school => {
        this.school = school;
        this.goBack(school);
      })
      .catch(error => this.error = error);
  }

  onCheckedChange(newValue) {
    this.service.isSms = newValue;
  }

  updateService() {
    this.schoolService
      .updateService(this.service)
      .then(service => {
        this.service = service;
      })
      .catch(error => this.error = error);
  }

  goBack(savedStudent: School = null) {
    this.close.emit(savedStudent);
    if (this.navigated) { window.history.back(); }
  }

}