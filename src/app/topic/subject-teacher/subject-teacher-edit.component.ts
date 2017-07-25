import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }          from '@angular/router';
import { Teacher }                 from '../../people/teacher/teacher';
import { TeacherService }          from '../../people/teacher/teacher.service';
import { SubjectTeacher }          from './subject-teacher';
import { SubjectTeacherService }   from './subject-teacher.service';
import { Gender }                  from '../../shared/gender';
import { CookieService }           from 'angular2-cookie/core';

@Component({
  selector: 'ui-subject-teacher-detail',
  templateUrl: './subject-teacher-edit.component.html',
  styleUrls: ['./subject-teacher-edit.component.css']
})

export class SubjectTeacherEditComponent implements OnInit, OnDestroy {
  subjectTeacher: SubjectTeacher;
  subjectName: string;
  teachers: Teacher[];
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false;
  className: string = this.cookieService.get("className");
  classId: number = +this.cookieService.get("classId");
  sectionName: string = this.cookieService.get("sectionName");
  sectionId: number = +this.cookieService.get("sectionId");

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private teacherService: TeacherService,
    private subjectTeacherService: SubjectTeacherService) {
  }

  ngOnInit() {
    this.getTeachers();
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let subjectTeacherId = +params['id'];
        this.navigated = true;
        this.subjectTeacherService.getSubjectTeacher(this.sectionId, subjectTeacherId)
          .then(subjectTeacher => {
            this.subjectTeacher = subjectTeacher;
            this.subjectName = subjectTeacher.subjectName;
          });
      }
    });
  }

  getTeachers() {
    this.teacherService
      .getTeachers()
      .then(teachers => this.teachers = teachers)
      .catch(error => this.error = error);
  }
  
  teacherSelected2(subjectTeacher) {
    this.subjectTeacher = subjectTeacher;
  }

  teacherSelected(teacherId) {
    for (var i = 0; i < this.teachers.length; i++) {
      if (this.teachers[i].id == teacherId) {
        this.subjectTeacher.teacherId = this.teachers[i].id;
        this.subjectTeacher.teacherName = this.teachers[i].name;
      }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.subjectTeacherService
      .put(this.subjectTeacher)
      .then(subjectTeacher => {
        this.subjectTeacher = subjectTeacher;
        this.goBack(subjectTeacher);
      })
      .catch(error => this.error = error);
  }

  goBack(savedSubjectTeacher: SubjectTeacher = null) {
    this.close.emit(savedSubjectTeacher);
    if (this.navigated) { window.history.back(); }
  }

}