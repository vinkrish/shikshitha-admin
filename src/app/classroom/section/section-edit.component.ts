import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }  from '@angular/router';
import { Teacher }         from '../../people/teacher/teacher';
import { TeacherService }  from '../../people/teacher/teacher.service';
import { Section }         from './section';
import { SectionService }  from './section.service';
import { CookieService }   from 'angular2-cookie/core';

@Component({
  selector: 'ui-section-detail',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.css']
})

export class SectionEditComponent implements OnInit, OnDestroy {
  teachers: Teacher[];
  section: Section;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false;
  className: string = this.cookieService.get("className");
  classId: number = +this.cookieService.get("classId");

  constructor(
    private route: ActivatedRoute,
    private cookieService:CookieService,
    private sectionService: SectionService,
    private teacherService: TeacherService) {
  }

  ngOnInit() {
    this.getTeachers();
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        //var ids: string[] = params['id'].split(",");
        //let id = +ids[0];
        //let id2 = +ids[1];
        let sectionId = +params['id'];
        this.navigated = true;
        this.sectionService.getSection(this.classId, sectionId)
            .then(section => this.section = section);
      } else {
        this.navigated = false;
        this.section = new Section();
        this.section.classId = this.classId;
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
    this.sectionService
        .save(this.section)
        .then(section => {
          this.section = section;
          this.goBack(section);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  goBack(savedSection: Section = null) {
    this.close.emit(savedSection);
    if (this.navigated) { window.history.back(); }
  }

}