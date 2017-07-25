import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exam }           from './exam';
import { ExamService }    from './exam.service';
import { CookieService }  from 'angular2-cookie/core';

@Component({
  selector: 'ui-exam-detail',
  templateUrl: './exam-edit.component.html',
  styleUrls: ['./exam-edit.component.css']
})

export class ExamEditComponent {
  exam: Exam;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false;
  classId: number = +this.cookieService.get("classId");
  className: string = this.cookieService.get("className");

  constructor(
    private cookieService: CookieService,
    private examService: ExamService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.examService.getExam(this.classId, id)
          .then(exam => {
            this.exam = exam;
          });
      } else {
        this.navigated = false;
        this.exam = new Exam();
        this.exam.classId = this.classId;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.examService
      .save(this.exam)
      .then(exam => {
        this.exam = exam;
        this.goBack(exam);
      })
      .catch(error => this.error = error);
  }

  goBack(savedExam: Exam = null) {
    this.close.emit(savedExam);
    if (this.navigated) { window.history.back(); }
  }
}