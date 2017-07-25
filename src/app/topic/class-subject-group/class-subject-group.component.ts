import { Component, OnInit }              from '@angular/core';
import { Router }                         from '@angular/router';
import { Clas }                           from '../../classroom/class/clas';
import { ClassService }                   from '../../classroom/class/class.service';
import { ClassSubjectGroup }              from './class-subject-group'
import { ClassSubjectGroupService }       from './class-subject-group.service';
import { CookieService }                  from 'angular2-cookie/core';

@Component({
  selector: 'ui-class-subject-group',
  templateUrl: './class-subject-group.component.html',
  styleUrls: ['./class-subject-group.component.css']
})

export class ClassSubjectGroupComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  clasSubjectGroups: ClassSubjectGroup[];
  selectedCSG: ClassSubjectGroup;
  addingCSG = false;
  error: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private classService: ClassService,
    private csgService: ClassSubjectGroupService) { }

  ngOnInit() {
    this.getClasses();
    this.selectedClass = new Clas();
  }

  getClasses() {
    this.classService
      .getClasses()
      .then(classes => this.classes = classes)
      .catch(error => this.error = error);
    }

  classSelected(selectedClass) {
    this.selectedClass = selectedClass;
    this.getClassSubjectGroups(this.selectedClass.id);
    this.cookieService.put("classId", "" + this.selectedClass.id);
    this.cookieService.put("className", this.selectedClass.className);
    this.addingCSG = false;
  }

  getClassSubjectGroups(id: number) {
    this.csgService
      .getClassSubjectGroups(id)
      .then(clasSubjectGroups => this.clasSubjectGroups = clasSubjectGroups)
      .catch(error => this.error = error);
  }

  onSelect(subjectGroupSubject: ClassSubjectGroup) {
    this.selectedCSG = subjectGroupSubject;
    this.addingCSG = false;
  }

  close(savedSGS: ClassSubjectGroup) {
    this.addingCSG = false;
    if (savedSGS) { this.getClassSubjectGroups(this.selectedClass.id); }
  }

  addCSG() {
    if(this.selectedClass.id !== undefined) {
      this.addingCSG = true;
    }
    this.selectedCSG = null;
  }

  deleteCSG(csg: ClassSubjectGroup, event: any) {
    event.stopPropagation();
    this.csgService
      .delete(csg)
      .then(res => {
        this.clasSubjectGroups = this.clasSubjectGroups.filter(h => h !== csg);
        if (this.selectedCSG === csg) { this.selectedCSG = null; }
      })
      .catch(error => this.error = error);
  }

}