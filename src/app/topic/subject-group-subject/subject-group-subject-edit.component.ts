import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subjects } from '../subjects/subjects';
import { SubjectsService } from '../subjects/subjects.service';
import { SubjectGroupSubject } from './subject-group-subject'
import { SubjectGroupSubjectService } from './subject-group-subject.service';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'ui-sgs-detail',
  templateUrl: './subject-group-subject-edit.component.html',
  styleUrls: ['./subject-group-subject-edit.component.css']
})

export class SubjectGroupSubjectEditComponent implements OnInit, OnDestroy {
  subjects: Subjects[];
  subjectGroupSubject: SubjectGroupSubject;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false;
  subjectGroupId: number = +this.cookieService.get("subjectGroupId");
  subjectGroupName: string = this.cookieService.get("subjectGroupName");

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private sgsService: SubjectGroupSubjectService,
    private subjectsService: SubjectsService) {
  }

  ngOnInit() {
    this.getSubjects();
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] === undefined) {
      this.navigated = false;
      this.subjectGroupSubject = new SubjectGroupSubject();
      this.subjectGroupSubject.subjectGroupId = this.subjectGroupId;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getSubjects() {
  this.subjectsService
    .getSubjects()
    .then(subjects => this.subjects = subjects)
    .catch(error => this.error = error);
  }

  subjectSelected(subjectId) {
    for (var i = 0; i < this.subjects.length; i++) {
      if (this.subjects[i].id == subjectId) {
        this.subjectGroupSubject.subjectId = this.subjects[i].id;
        this.subjectGroupSubject.subjectName = this.subjects[i].subjectName;
      }
    }
  }

  save() {
    this.sgsService
      .save(this.subjectGroupSubject)
      .then(subjectGroupSubject => {
      this.subjectGroupSubject = subjectGroupSubject;
      this.goBack(subjectGroupSubject);
      })
      .catch(error => this.error = error);
  }

  goBack(savedSGS: SubjectGroupSubject = null) {
    this.close.emit(savedSGS);
    if (this.navigated) { window.history.back(); }
  }

}