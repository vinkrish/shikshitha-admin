import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clas }           from './clas';
import { AttendanceType } from '../../shared/attendance-type';
import { Teacher }         from '../../people/teacher/teacher';
import { TeacherService }  from '../../people/teacher/teacher.service';
import { ClassService }   from './class.service';

@Component({
  selector: 'ui-class-detail',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})

export class ClassEditComponent implements OnInit, OnDestroy {
  teachers: Teacher[];
  clas: Clas;
  @Output() close = new EventEmitter();
  attendanceTypes = [
    new AttendanceType("Daily"),
    new AttendanceType("Session"),
    new AttendanceType("Period")
  ];
  error: any;
  sub: any;
  navigated = false;

  constructor(
    private classService: ClassService,
    private route: ActivatedRoute,
    private teacherService: TeacherService) {
  }

  ngOnInit() {
    this.getTeachers();
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.classService.getClass(id)
          .then(clas => this.clas = clas);
      } else {
        this.navigated = false;
        this.clas = new Clas();
        this.clas.attendanceType = this.attendanceTypes[0].type;
        this.clas.teacherId = 0;
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

  save() {
    this.classService
      .save(this.clas)
      .then(clas => {
        this.clas = clas;
        this.goBack(clas);
      })
      .catch(error => this.error = error);
  }

  goBack(savedClas: Clas = this.clas) {
    this.close.emit(savedClas);
    if (this.navigated) { window.history.back(); }
  }

}