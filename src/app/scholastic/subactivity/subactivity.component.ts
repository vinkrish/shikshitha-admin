import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';
import { Clas }                from '../../classroom/class/clas';
import { Section }             from '../../classroom/section/section';
import { ClassService }        from '../../classroom/class/class.service';
import { SectionService }      from '../../classroom/section/section.service';
import { Exam }                from '../exam/exam';
import { ExamService }         from '../exam/exam.service';
import { ExamSubject }         from '../exam-subject/exam-subject';
import { ExamSubjectService }  from '../exam-subject/exam-subject.service';
import { Activity }            from '../activity/activity';
import { ActivityService }     from '../activity/activity.service';
import { SubActivity }         from './subactivity';
import { SubActivityService }  from './subactivity.service';

@Component({
  selector: 'ui-subactivity',
  templateUrl: './subactivity.component.html',
  styleUrls: ['./subactivity.component.css']
})

export class SubActivityComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  exams: Exam[];
  selectedExam: Exam;
  examSubjects: ExamSubject[];
  selectedExamSubject: ExamSubject;
  activities: Activity[];
  selectedActivity: Activity;
  subActivity: SubActivity;
  subActivities: SubActivity[];
  selectedSubActivity: SubActivity;
  addingSubActivity = false;
  error: any;

  constructor(
    private router: Router,
    private classService: ClassService,
    private sectionService: SectionService,
    private examService: ExamService,
    private examSubjectService: ExamSubjectService,
    private activityService: ActivityService,
    private subActivityService: SubActivityService) { 
  }

  ngOnInit() {
    this.getClasses();
    this.selectedClass = new Clas();
    this.selectedSection = new Section();
    this.selectedExam = new Exam();
    this.selectedExamSubject = new ExamSubject();
    this.selectedActivity = new Activity();
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
    this.subActivities = null;
    this.selectedSection = new Section();
    this.selectedExam = new Exam();
    this.selectedExamSubject = new ExamSubject();
    this.selectedActivity = new Activity();
    this.getSections(this.selectedClass.id);
    this.getExams(this.selectedClass.id);
    this.addingSubActivity = false;
  }

  getSections(id: number) {
    this.sectionService
      .getSections(id)
      .then(sections => this.sections = sections)
      .catch(error => this.error = error);
  }

  sectionSelected(selectedSection) {
    this.selectedSection = selectedSection;
    this.selectedExamSubject = new ExamSubject();
    this.selectedActivity = new Activity();
    this.activities = null;
    this.subActivities = null;
    this.addingSubActivity = false;
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
    this.activities = null;
    this.subActivities = null;
    this.getExamSubjects(this.selectedExam.id);
    this.addingSubActivity = false;
  }

  getExamSubjects(id: number) {
    this.examSubjectService
      .getExamSubjects(id)
      .then(examSubjects => this.examSubjects = examSubjects)
      .catch(error => this.error = error)
  }

  examSubjectSelected(selectedExamSubject) {
    this.selectedExamSubject = selectedExamSubject;
    this.activities = null;
    this.subActivities = null;
    this.getActivities();
    this.addingSubActivity = false;
  }

  getActivities() {
    this.activityService
      .getActivities(this.selectedSection.id, this.selectedExam.id, this.selectedExamSubject.subjectId)
      .then(activities => this.activities = activities)
      .catch(error => this.error = error);
  }

  activitySelected(selectedActivity) {
    this.selectedActivity = selectedActivity;
    this.subActivities = null;
    this.getSubActivities();
    this.addingSubActivity = false;
  }

  getSubActivities() {
    this.subActivityService
      .getSubActivities(this.selectedActivity.id)
      .then(subActivities => this.subActivities = subActivities)
      .catch(error => this.error = error);
  }

  onSelect(subactivity: SubActivity) {
    this.selectedSubActivity = subactivity;
    this.addingSubActivity = false;
  }

  close() {
    this.addingSubActivity = false;
  }

  add() {
    if (this.selectedClass.id !== undefined && 
        this.selectedSection.id !== undefined &&
        this.selectedExam.id !== undefined &&
        this.selectedExamSubject.id !== undefined &&
        this.selectedActivity.id != undefined) {
      this.subActivity = new SubActivity();
      this.subActivity.activityId = this.selectedActivity.id;
      this.addingSubActivity = true;
    }
    this.selectedSubActivity = null;
  }

  delete(subactivity: SubActivity, event: any) {
    event.stopPropagation();
    this.subActivityService
      .delete(subactivity)
      .then(res => {
        this.subActivities = this.subActivities.filter(h => h !== subactivity);
        if (this.selectedSubActivity === subactivity) { this.selectedSubActivity = null; }
      })
      .catch(error => this.error = error);
  }

  save() {
    this.subActivityService
      .post(this.subActivity)
      .then(subactivity => {
        this.addingSubActivity = false;
        this.selectedActivity = new Activity();
        this.subActivities = null;
      })
      .catch(error => this.error = error);
  }

  update(subactivity: SubActivity, event: any){
    event.stopPropagation();
    this.subActivityService
      .save(subactivity)
      .then(() => this.getExamSubjects(this.selectedExam.id))
      .catch(error => this.error = error);
  }

}