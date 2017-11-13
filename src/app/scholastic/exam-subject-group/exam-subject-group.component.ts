import { Component, OnInit } 	from '@angular/core';
import { Router }            	from '@angular/router';
import { Clas }               from '../../classroom/class/clas';
import { ClassService }       from '../../classroom/class/class.service';
import { Exam }			 		      from '../exam/exam';
import { ExamService }		 	  from '../exam/exam.service';
import { ClassSubjectGroup }       from '../../topic/class-subject-group/class-subject-group';
import { ClassSubjectGroupService }from '../../topic/class-subject-group/class-subject-group.service';
import { ExamSubjectGroup }        from './exam-subject-group';
import { ExamSubjectGroupService } from './exam-subject-group.service';

@Component({
	selector: 'ui-esg',
	templateUrl: './exam-subject-group.component.html',
	styleUrls: ['./exam-subject-group.component.css']
})

export class ExamSubjectGroupComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  exams: Exam[];
  selectedExam: Exam;
  classSubjectGroups: ClassSubjectGroup[];
  examSubjectGroup: ExamSubjectGroup;
  examSubjectGroups: ExamSubjectGroup[];
  selectedEsg: ExamSubjectGroup;
  addingEsg = false;
  error: any;

  constructor(
    private router: Router,
    private classService: ClassService,
    private examService: ExamService,
    private csgService: ClassSubjectGroupService,
    private esgService: ExamSubjectGroupService) { 
  }

  ngOnInit() {
    this.getClasses();
    this.selectedClass = new Clas();
    this.selectedExam = new Exam();
  }

  getClasses() {
    this.classService
      .getClasses()
      .then(classes => this.classes = classes)
      .catch(error => this.error = error);
    }

  classSelected(selectedClass) {
    this.selectedClass = selectedClass;
    this.selectedExam = new Exam();
    this.classSubjectGroups = null;
    this.getClassSubjectGroups(this.selectedClass.id);
    this.examSubjectGroups = null;
    this.getExams(this.selectedClass.id);
    this.addingEsg = false;
  }

  getExams(id: number) {
    this.examService
      .getExams(id)
      .then(exams => this.exams = exams)
      .catch(error => this.error = error);
  }

  examSelected(selectedExam){
    this.selectedExam = selectedExam;
    this.examSubjectGroups = null;
    this.getExamSubjectGroup(this.selectedExam.id);
    this.addingEsg = false;
  }

  getExamSubjectGroup(id: number){
    this.esgService
      .getExamSubjectGroups(id)
      .then(esgs => this.examSubjectGroups = esgs)
      .catch(error => this.error = error);
  }

  onSelect(esg: ExamSubjectGroup) {
    this.selectedEsg = esg;
    this.addingEsg = false;
  }

  close() {
    this.addingEsg = false;
  }

  add() {
    if(this.selectedClass.id !== undefined && this.selectedExam.id !== undefined) {
      this.examSubjectGroup = new ExamSubjectGroup();
      this.examSubjectGroup.examId = this.selectedExam.id;
      this.addingEsg = true
    }
    this.selectedEsg = null;
  }

  delete(esg: ExamSubjectGroup, event: any) {
    event.stopPropagation();
    this.esgService
      .delete(esg)
      .then(res => {
        this.examSubjectGroups = this.examSubjectGroups.filter(h => h !== esg);
        if (this.selectedEsg === esg) { this.selectedEsg = null; }
      })
      .catch(error => this.error = error);
  }

  getClassSubjectGroups(id: number) {
    this.csgService
      .getClassSubjectGroups(id)
      .then(classSubjectGroups => this.classSubjectGroups = classSubjectGroups)
      .catch(error => this.error = error);
  }

  csgSelected(csgId) {
      for (var i = 0; i < this.classSubjectGroups.length; i++) {
        if (this.classSubjectGroups[i].subjectGroupId == csgId) {
          this.examSubjectGroup.subjectGroupId = this.classSubjectGroups[i].subjectGroupId;
          this.examSubjectGroup.subjectGroupName = this.classSubjectGroups[i].subjectGroupName;
        }
      }
    }

  save() {
    this.esgService
      .post(this.examSubjectGroup)
      .then(examSubjectGroup => {
        this.addingEsg = false;
        this.examSubjectGroup = null;
        this.examSubjectGroups = null;
        this.selectedExam = new Exam();
      })
      .catch(error => this.error = error);
  }

}