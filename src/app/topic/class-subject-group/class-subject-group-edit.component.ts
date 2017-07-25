import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }           from '@angular/router';
import { SubjectGroup }             from '../subject-group/subject-group';
import { SubjectGroupService }      from '../subject-group/subject-group.service';
import { ClassSubjectGroup }        from './class-subject-group'
import { ClassSubjectGroupService } from './class-subject-group.service';
import { CookieService }            from 'angular2-cookie/core';

@Component({
  selector: 'ui-csg-detail',
  templateUrl: './class-subject-group-edit.component.html',
  styleUrls: ['./class-subject-group-edit.component.css']
})

export class ClassSubjectGroupEditComponent implements OnInit, OnDestroy {
  subjectGroups: SubjectGroup[];
  classSubjectGroup: ClassSubjectGroup;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false;
  classId: number = +this.cookieService.get("classId");
  className: string = this.cookieService.get("className");

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private csgService: ClassSubjectGroupService,
    private subjectGroupService: SubjectGroupService) {
  }

  ngOnInit() {
    this.getSubjectGroups();
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] === undefined) {
        this.navigated = false;
        this.classSubjectGroup = new ClassSubjectGroup();
        this.classSubjectGroup.classId = this.classId;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getSubjectGroups() {
    this.subjectGroupService
      .getSubjectGroups()
      .then(subjectGroups => this.subjectGroups = subjectGroups)
      .catch(error => this.error = error);
  }

  subjectGroupSelected(subjectId) {
    for (var i = 0; i < this.subjectGroups.length; i++) {
      if (this.subjectGroups[i].id == subjectId) {
        this.classSubjectGroup.subjectGroupId = this.subjectGroups[i].id;
        this.classSubjectGroup.subjectGroupName = this.subjectGroups[i].subjectGroupName;
      }
    }
  }

  save() {
    this.csgService
      .save(this.classSubjectGroup)
      .then(classSubjectGroup => {
        this.classSubjectGroup = classSubjectGroup;
        this.goBack(classSubjectGroup);
      })
      .catch(error => this.error = error);
  }

  goBack(savedSection: ClassSubjectGroup = null) {
    this.close.emit(savedSection);
    if (this.navigated) { window.history.back(); }
  }

}