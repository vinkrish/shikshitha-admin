import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { Clas }                 from '../../classroom/class/clas';
import { Section }			        from '../../classroom/section/section';
import { Student }				      from '../../people/student/student';
import { ClassService }         from '../../classroom/class/class.service';
import { SectionService }		    from '../../classroom/section/section.service';
import { StudentService }       from '../../people/student/student.service';
import { SubjectStudents }      from '../../topic/subject-student/subject-students';
import { SubjectStudentService }from '../../topic/subject-student/subject-student.service';
import { Exam }                 from '../exam/exam';
import { ExamService }          from '../exam/exam.service';
import { ExamSubject }          from '../exam-subject/exam-subject';
import { ExamSubjectService }   from '../exam-subject/exam-subject.service';
import { Activity }             from '../activity/activity';
import { ActivityService }      from '../activity/activity.service';
import { SubActivity }          from '../subactivity/subactivity';
import { SubActivityService }   from '../subactivity/subactivity.service';
import { SubActivityScore }     from './subactivity-score';
import { SubActivityScoreService } from './subactivity-score.service';
import { CookieService }		    from 'angular2-cookie/core';

@Component({
  selector: 'ui-subactivity-score',
  templateUrl: './subactivity-score.component.html',
  styleUrls: ['./subactivity-score.component.css']
})

export class SubActivityScoreComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  students: Student[];
  examStudents: Student[];
  subjectStudent: SubjectStudents;
  exams: Exam[];
  selectedExam: Exam;
  examSubjects: ExamSubject[];
  selectedExamSubject: ExamSubject;
  activities: Activity[];
  selectedActivity: Activity;
  subActivities: SubActivity[];
  selectedSubActivity: SubActivity;
  score: SubActivityScore[];
  existingScore: SubActivityScore[];
  isScorePresent: Boolean;
  error: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private classService: ClassService,
    private sectionService: SectionService,
    private studentService: StudentService,
    private examService: ExamService,
    private examSubjectService: ExamSubjectService,
    private ssService: SubjectStudentService,
    private activityService: ActivityService,
    private subActivityService: SubActivityService,
    private subActScoreService: SubActivityScoreService) { 
  }

  ngOnInit() {
    this.getClasses();
    this.selectedClass = new Clas();
    this.clearValues();
  }

  getClasses() {
    this.classService
      .getClasses()
      .then(classes => this.classes = classes)
      .catch(error => this.error = error);
    }

  classSelected(selectedClass) {
    this.selectedClass = selectedClass;
    this.clearValues();
    this.getSections(this.selectedClass.id);
    this.getExams(this.selectedClass.id);
  }

  getSections(id: number) {
    this.sectionService
      .getSections(id)
      .then(sections => this.sections = sections)
      .catch(error => this.error = error);
  }

  sectionSelected(selectedSection) {
    this.selectedSection = selectedSection;
    this.selectedExam = new Exam();
    this.selectedExamSubject = new ExamSubject();
    this.selectedActivity = new Activity();
    this.selectedSubActivity = new SubActivity();
    this.activities = [];
    this.subActivities = [];
    this.examStudents = [];
    this.score = [];
    this.students = [];
    this.existingScore = [];
    this.getStudents(this.selectedSection.id);
  }

  getStudents(id: number) {
    this.studentService
      .getStudents(id)
      .then(students => {
        this.students = students;
      })
      .catch(error => this.error = error);
  }

  getExams(id: number) {
    this.examService
      .getExams(id)
      .then(exams => this.exams = exams)
      .catch(error => this.error = error);
  }

  examSelected(selectedExam) {
    this.examSubjects = null;
    this.selectedExam = selectedExam;
    this.selectedExamSubject = new ExamSubject();
    this.selectedActivity = new Activity();
    this.activities = [];
    this.examStudents = [];
    this.score = [];
    this.existingScore = [];
    this.getExamSubjects(this.selectedExam.id);
  }

  getExamSubjects(id: number) {
    this.examSubjectService
      .getExamSubjects(id)
      .then(examSubjects => this.examSubjects = examSubjects)
      .catch(error => this.error = error)
  }

  examSubjectSelected(selectedExamSubject) {
    this.selectedExamSubject = selectedExamSubject;
    this.selectedActivity = new Activity();
    this.selectedSubActivity = new SubActivity();
    this.activities = [];
    this.subActivities = [];
    this.examStudents = [];
    this.score = [];
    this.existingScore = [];
    this.getSubjectStudents();
  }

  getSubjectStudents() {
    this.ssService
      .getSubjectStudent(this.selectedSection.id, this.selectedExamSubject.subjectId)
      .then(subjectStudent => {
        this.subjectStudent = subjectStudent;
        this.getActivites();
      })
      .catch(error => this.error = error);
  }

  initExamStudents() {
    if(typeof this.subjectStudent.studentIds != 'undefined') {
      var intIds = this.subjectStudent.studentIds.split(",").map(Number).filter(Boolean);
      for (let ids of intIds) {
        for (var i = 0; i < this.students.length; i++) {
          if (this.students[i].id == ids) {
            this.examStudents.push(this.students[i]);
            this.initScore(i);
          }
        }
      }
    }
  }

  initScore(index: number) {
    var subActscore = new SubActivityScore();
    subActscore.subActivityId = this.selectedSubActivity.id;
    subActscore.studentId = this.students[index].id;
    subActscore.grade = '';
    this.score.push(subActscore);
  }

  getActivites() {
    this.activityService
      .getActivities(this.selectedSection.id, this.selectedExam.id, this.selectedExamSubject.subjectId)
      .then(activities => this.activities = activities)
      .catch(error => this.error = error);
  }

  activitySelected(selectedActivity) {
    this.selectedActivity = selectedActivity;
    this.selectedSubActivity = new SubActivity();
    this.subActivities = [];
    this.examStudents = [];
    this.score = [];
    this.existingScore = [];
    this.getSubActivities();
  }

  getSubActivities() {
    this.subActivityService
      .getSubActivities(this.selectedActivity.id)
      .then(subActivities => this.subActivities = subActivities)
      .catch(error => this.error = error);
  }

  subActivitySelected(selectedSubActivity) {
    this.selectedSubActivity = selectedSubActivity;
    this.examStudents = [];
    this.score = [];
    this.existingScore = [];
    this.initExamStudents();
    this.getSubActivityScore();
  }

  getSubActivityScore() {
    this.subActScoreService
      .getScore(this.selectedSubActivity.id)
      .then(existingScore => {
        this.existingScore = existingScore;
        if(this.existingScore.length == 0) {
          this.isScorePresent = false;
        } else {
          this.isScorePresent = true;
          this.exportScore();
        }
      })
      .catch(error => this.error = error);
  }

  exportScore() {
    for (var i = 0; i < this.score.length; i++) {
      for (var j = 0; j < this.existingScore.length; j++) {
        if (this.existingScore[j].studentId == this.score[i].studentId) {
          this.score[i].id = this.existingScore[j].id;
          this.score[i].mark = this.existingScore[j].mark;
          this.score[i].grade = this.existingScore[j].grade;
        }
      }
    }
  }

  defaultScore() {
    for (var i = 0; i < this.score.length; i++) {
      if (typeof this.score[i].mark == 'undefined') {
        this.score[i].mark = 0;
      }
    }
  }

  clearValues() {
    this.selectedSection = new Section();
    this.selectedExam = new Exam();
    this.selectedExamSubject = new ExamSubject();
    this.selectedActivity = new Activity();
    this.selectedSubActivity = new SubActivity();
    this.exams = [];
    this.examStudents = [];
    this.examSubjects = [];
    this.activities = [];
    this.subActivities = [];
    this.score = [];
    this.students = [];
    this.existingScore = [];
  }

  save() {
    this.defaultScore();
    if (this.isScorePresent) {
      this.subActScoreService
        .put(this.score)
        .then()
        .catch(error => this.error = error)
    } else {
      this.subActScoreService
        .post(this.score)
        .then()
        .catch(error => this.error = error)
    }
  }

}