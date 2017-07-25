import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Teacher }           from './teacher';
import { Gender }            from '../../shared/gender';
import { TeacherService }    from './teacher.service';

@Component({
  selector: 'ui-teacher-detail',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css']
})

export class TeacherEditComponent implements OnInit, OnDestroy {
  teacher: Teacher;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false;
  genders = [
    new Gender("M"),
    new Gender("F")
  ];

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.teacherService.getTeacher(id)
            .then(teacher => this.teacher = teacher);
      } else {
        this.navigated = false;
        this.teacher = new Teacher();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.teacherService
        .save(this.teacher)
        .then(teacher => {
          this.teacher = teacher;
          this.goBack(teacher);
        })
        .catch(error => this.error = error);
  }

  goBack(savedTeacher: Teacher = null) {
    this.close.emit(savedTeacher);
    if (this.navigated) { window.history.back(); }
  }

}