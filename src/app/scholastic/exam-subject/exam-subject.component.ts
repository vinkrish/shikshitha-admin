import { Component, OnInit } 	from '@angular/core';
import { Router }            	from '@angular/router';
import { Clas }               from '../../classroom/class/clas';
import { ClassService }       from '../../classroom/class/class.service';
import { Exam }			 		      from '../exam/exam';
import { ExamService }		 	  from '../exam/exam.service';
import { ExamSubjectGroup }         from '../exam-subject-group/exam-subject-group';
import { ExamSubjectGroupService }  from '../exam-subject-group/exam-subject-group.service';
import { SubjectGroupSubject }      from '../../topic/subject-group-subject/subject-group-subject'
import { SubjectGroupSubjectService }  from '../../topic/subject-group-subject/subject-group-subject.service';
import { Subjects }            from '../../topic/subjects/subjects';
import { SubjectsService }     from '../../topic/subjects/subjects.service';
import { ExamSubject }         from './exam-subject';
import { ExamSubjectService }  from './exam-subject.service';

@Component({
	selector: 'ui-exam-subject',
	templateUrl: './exam-subject.component.html',
	styleUrls: ['./exam-subject.component.css']
})

export class ExamSubjectComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  exams: Exam[];
  selectedExam: Exam;
  examSubjectGroup: ExamSubjectGroup;
  examSubjectGroups: ExamSubjectGroup[];
  selectedEsg: ExamSubjectGroup;
  subjectGroupSubjects: SubjectGroupSubject[];
  partitionSubjects: Subjects[];
  examSubject: ExamSubject;
  examSubjects: ExamSubject[];
  selectedExamSubject: ExamSubject;
  addingExamSubject = false;
  isPartitionSubject = false;
  addingPartitionSubject = false;
  error: any;

  constructor(
    private router: Router,
    private classService: ClassService,
    private examService: ExamService,
    private esgService: ExamSubjectGroupService,
    private sgsService: SubjectGroupSubjectService,
    private subjectsService: SubjectsService,
    private examSubjectService: ExamSubjectService) {
  }

  ngOnInit() {
    this.getClasses();
    this.selectedClass = new Clas();
    this.selectedExam = new Exam();
    this.selectedEsg = new ExamSubjectGroup();
    this.partitionSubjects = [];
  }

  getClasses() {
    this.classService
      .getClasses()
      .then(classes => this.classes = classes)
      .catch(error => this.error = error);
    }

  classSelected(selectedClass) {
    this.examSubjects = null;
    this.selectedClass = selectedClass;
    this.selectedExam = new Exam();
    this.selectedEsg = new ExamSubjectGroup();
    this.examSubjectGroups = null;
    this.getExams(this.selectedClass.id);
    this.addingExamSubject = false;
  }

  getExams(id: number) {
    this.examService
      .getExams(id)
      .then(exams => this.exams = exams)
      .catch(error => this.error = error);
  }

  examSelected(selectedExam){
    this.examSubjects = null;
    this.selectedExam = selectedExam;
    this.selectedEsg = new ExamSubjectGroup();
    this.examSubjectGroups = null;
    this.getExamSubjectGroup(this.selectedExam.id);
    this.getExamSubjects(this.selectedExam.id);
    this.addingExamSubject = false;
  }

  getExamSubjectGroup(id: number){
    this.esgService
      .getExamSubjectGroups(id)
      .then(esgs => this.examSubjectGroups = esgs)
      .catch(error => this.error = error);
  }

  esgSelected(selectedEsg){
    this.selectedEsg = selectedEsg;
    this.getSubjectGroupSubjects(this.selectedEsg.subjectGroupId);
    this.addingExamSubject = false;
  }

  getSubjectGroupSubjects(id: number) {
    this.sgsService
        .getSubjectGroupSubjects(id)
        .then(subjectGroupSubjects => this.subjectGroupSubjects = subjectGroupSubjects)
        .catch(error => this.error = error);
  }

  getExamSubjects(id: number){
    this.examSubjectService
      .getExamSubjects(id)
      .then(examSubjects => this.examSubjects = examSubjects)
      .catch(error => this.error = error)
  }

  getPartitionSubjects() {
    this.subjectsService
      .getPartitionSubjects(this.selectedExamSubject.subjectId)
      .then(partitionSubjects => {
        this.partitionSubjects = partitionSubjects;
        if(this.partitionSubjects.length != 0) {
          this.isPartitionSubject = true;
        } else {
          this.isPartitionSubject = false;
          this.addingPartitionSubject = false;
        }
      })
      .catch(error => this.error = error)
  }

  onSelect(examSubject: ExamSubject) {
    this.selectedExamSubject = examSubject;
    this.addingExamSubject = false;
    this.partitionSubjects = [];
    this.getPartitionSubjects();
  }

  close() {
    this.addingExamSubject = false;
  }

  add() {
    this.addingPartitionSubject = false;
    if(this.selectedClass.id !== undefined && this.selectedExam.id !== undefined && this.selectedEsg.id !== undefined) {
      this.examSubject = new ExamSubject();
      this.examSubject.examId = this.selectedExam.id;
      this.addingExamSubject = true;
    }
    this.selectedExamSubject = null;
  }

  enablePartition() {
    this.addingExamSubject = false;
    if (this.addingPartitionSubject) {
      this.addingPartitionSubject = false;
    } else {
      this.examSubject = new ExamSubject();
      this.examSubject.examId = this.selectedExam.id;
      this.addingPartitionSubject = true;
    }
  }

  delete(examSubject: ExamSubject, event: any) {
    event.stopPropagation();
    this.examSubjectService
      .delete(examSubject)
      .then(res => {
        this.examSubjects = this.examSubjects.filter(h => h !== examSubject);
        if (this.selectedExamSubject === examSubject) { this.selectedEsg = null; }
      })
      .catch(error => this.error = error);
  }

  subjectSelected(subjectId) {
    for (var i = 0; i < this.subjectGroupSubjects.length; i++) {
      if (this.subjectGroupSubjects[i].subjectId == subjectId) {
        this.examSubject.subjectId = subjectId;
        this.examSubject.subjectName = this.subjectGroupSubjects[i].subjectName;
      }
    }
  }

  partitionSubjectSelected(subjectId) {
    for (var i = 0; i < this.partitionSubjects.length; i++) {
      if (this.partitionSubjects[i].id == subjectId) {
        this.examSubject.subjectId = subjectId;
        this.examSubject.subjectName = this.partitionSubjects[i].subjectName;
      }
    }
  }

  save() {
    this.examSubjectService
      .post(this.examSubject)
      .then(examSubject => {
        this.addingExamSubject = false;
        this.addingPartitionSubject = false;
        this.examSubjectGroup = null;
        this.examSubjectGroups = null;
        this.selectedExam = new Exam();
        this.selectedEsg = new ExamSubjectGroup();
        this.examSubjects = null;
        //this.selectedExamSubject = new ExamSubject();
        //this.getExamSubjects(this.selectedExam.id);
      })
      .catch(error => this.error = error);
  }

  update(examSubject: ExamSubject, event: any){
    event.stopPropagation();
    this.examSubjectService
      .save(examSubject)
      .then(() => this.getExamSubjects(this.selectedExam.id))
      .catch(error => this.error = error);
  }

}