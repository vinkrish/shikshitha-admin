import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';
import { Clas }                     from '../class/clas';
import { Portion }			            from './portion';
import { PortionService }		        from './portion.service';
import { ClassService }             from '../class/class.service';
import { ClassSubjectGroup }        from '../../topic/class-subject-group/class-subject-group';
import { ClassSubjectGroupService } from '../../topic/class-subject-group/class-subject-group.service';
import { SubjectGroupSubject }      from '../../topic/subject-group-subject/subject-group-subject'
import { SubjectGroupSubjectService }  from '../../topic/subject-group-subject/subject-group-subject.service';
import { CookieService }            from 'angular2-cookie/core';

@Component({
  selector: 'ui-portion',
  templateUrl: './portion.component.html',
  styleUrls: ['./portion.component.css']
})

export class PortionComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  classSubjectGroups: ClassSubjectGroup[];
  selectedCSG: ClassSubjectGroup;
  subjectGroupSubjects: SubjectGroupSubject[];
  selectedSGS: SubjectGroupSubject;
  portions: Portion[];
  selectedPortion: Portion;
  addingPortion = false;
  error: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private classService: ClassService,
    private csgService: ClassSubjectGroupService,
    private sgsService: SubjectGroupSubjectService,
    private portionService: PortionService) { 
  }

  ngOnInit() {
    this.getClasses();
    this.selectedClass = new Clas();
    this.selectedCSG = new ClassSubjectGroup();
    this.selectedSGS = new SubjectGroupSubject();
    this.classSubjectGroups = [];
    this.subjectGroupSubjects = [];
  }

  getClasses() {
    this.classService
      .getClasses()
      .then(classes => this.classes = classes)
      .catch(error => this.error = error);
    }

  classSelected(selectedClass) {
    this.selectedClass = selectedClass;
    this.selectedCSG = new ClassSubjectGroup();
    this.selectedSGS = new SubjectGroupSubject();
    this.selectedPortion = new Portion();
    this.classSubjectGroups = [];
    this.subjectGroupSubjects = [];
    this.portions = [];
    this.getClassSubjectGroups(this.selectedClass.id);
    this.cookieService.put("classId", "" + this.selectedClass.id);
    this.cookieService.put("className", this.selectedClass.className);
    this.addingPortion = false;
  }

  getClassSubjectGroups(id: number) {
    this.csgService
      .getClassSubjectGroups(id)
      .then(classSubjectGroups => this.classSubjectGroups = classSubjectGroups)
      .catch(error => this.error = error);
  }

  csgSelected(selectedCSG){
    this.selectedCSG = selectedCSG;
    this.selectedSGS = new SubjectGroupSubject();
    this.selectedPortion = new Portion();
    this.subjectGroupSubjects = [];
    this.portions = [];
    this.getSubjectGroupSubjects(this.selectedCSG.subjectGroupId);
    this.addingPortion = false;
  }

  getSubjectGroupSubjects(id: number) {
    this.sgsService
        .getSubjectGroupSubjects(id)
        .then(subjectGroupSubjects => this.subjectGroupSubjects = subjectGroupSubjects)
        .catch(error => this.error = error);
  }

  sgsSelected(selectedSGS) {
    this.selectedSGS = selectedSGS;
    this.selectedPortion = new Portion();
    this.portions = [];
    this.getPortions();
    this.cookieService.put("subjectId", "" + this.selectedSGS.subjectId);
    this.cookieService.put("subjectName", this.selectedSGS.subjectName);
    this.addingPortion = false;
  }

  getPortions() {
    this.portionService
      .getPortions(this.selectedClass.id, this.selectedSGS.subjectId)
      .then(portions => this.portions = portions)
      .catch(error => this.error = error);
  }

  onSelect(portion: Portion) {
    this.selectedPortion = portion;
    this.addingPortion = false;
  }

  close(savedPortion: Portion) {
    this.addingPortion = false;
    if (savedPortion) { this.getPortions(); }
  }

  addPortion() {
    if(this.selectedClass.id !== 0 && this.selectedCSG.id !== undefined && this.selectedSGS.id !== undefined) {
      this.addingPortion = true;
    }
    this.selectedPortion = null;
  }

  gotoEdit(portion: Portion, event: any) {
    event.stopPropagation();
    this.router.navigate(['classroom/portion/edit', portion.id]);
  }

  deletePortion(portion: Portion, event: any) {
    event.stopPropagation();
    this.portionService
      .delete(portion)
      .then(res => {
        this.portions = this.portions.filter(h => h !== portion);
        if (this.selectedPortion === portion) { this.selectedPortion = null; }
      })
      .catch(error => this.error = error);
  }

}