import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';
import { Clas }                     from '../../classroom/class/clas';
import { Section }                  from '../../classroom/section/section';
import { Student }                  from '../../people/student/student';
import { ClassSubjectGroup }        from '../../topic/class-subject-group/class-subject-group';
import { SubjectGroupSubject }      from '../../topic/subject-group-subject/subject-group-subject'
import { Sliptest }                 from '../sliptest/sliptest';
import { SubjectStudents }          from '../../topic/subject-student/subject-students';
import { SliptestScore }            from './sliptest-score';
import { ClassService }             from '../../classroom/class/class.service';
import { SectionService }           from '../../classroom/section/section.service';
import { StudentService }           from '../../people/student/student.service';
import { ClassSubjectGroupService } from '../../topic/class-subject-group/class-subject-group.service';
import { SubjectGroupSubjectService }  from '../../topic/subject-group-subject/subject-group-subject.service';
import { SliptestService }          from '../sliptest/sliptest.service';
import { SubjectStudentService }    from '../../topic/subject-student/subject-student.service';
import { SliptestScoreService }     from './sliptest-score.service';
import { CookieService }            from 'angular2-cookie/core';

@Component({
  selector: 'ui-sliptest-score',
  templateUrl: './sliptest-score.component.html',
  styleUrls: ['./sliptest-score.component.css']
})

export class SliptestScoreComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  students: Student[];
  sliptestStudents: Student[];
  classSubjectGroups: ClassSubjectGroup[];
  selectedCSG: ClassSubjectGroup;
  subjectGroupSubjects: SubjectGroupSubject[];
  selectedSGS: SubjectGroupSubject;
  subjectStudent: SubjectStudents;
  sliptests: Sliptest[];
  selectedSliptest: Sliptest;
  marks: SliptestScore[];
  existingMarks: SliptestScore[];
  isMarksPresent: Boolean;
  error: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private classService: ClassService,
    private sectionService: SectionService,
    private studentService: StudentService,
    private csgService: ClassSubjectGroupService,
    private sgsService: SubjectGroupSubjectService,
    private ssService: SubjectStudentService,
    private sliptestService: SliptestService,
    private stsService: SliptestScoreService) { 
  }

  ngOnInit() {
    this.getClasses();
    this.selectedClass = new Clas(0, "");
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
    this.getClassSubjectGroups(this.selectedClass.id);
  }

  getSections(id: number) {
    this.sectionService
      .getSections(id)
      .then(sections => this.sections = sections)
      .catch(error => this.error = error);
  }

  sectionSelected(selectedSection) {
    this.selectedSection = selectedSection;
    this.selectedSliptest = new Sliptest();
    this.selectedSGS = new SubjectGroupSubject();
    this.sliptests = [];
    this.marks = [];
    this.existingMarks = [];
    this.students = [];
    this.sliptestStudents = [];
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

  getClassSubjectGroups(id: number) {
    this.csgService
      .getClassSubjectGroups(id)
      .then(classSubjectGroups => this.classSubjectGroups = classSubjectGroups)
      .catch(error => this.error = error);
  }

  csgSelected(selectedCSG){
    this.selectedCSG = selectedCSG;
    this.selectedSGS = new SubjectGroupSubject();
    this.selectedSliptest = new Sliptest();
    this.subjectGroupSubjects = [];
    this.sliptests = [];
    this.marks = [];
    this.existingMarks = [];
    this.sliptestStudents = [];
    this.getSubjectGroupSubjects(this.selectedCSG.subjectGroupId);
  }

  getSubjectGroupSubjects(id: number) {
    this.sgsService
        .getSubjectGroupSubjects(id)
        .then(subjectGroupSubjects => this.subjectGroupSubjects = subjectGroupSubjects)
        .catch(error => this.error = error);
  }

  sgsSelected(selectedSGS) {
    this.selectedSGS = selectedSGS;
    this.selectedSliptest = new Sliptest();
    this.sliptests = [];
    this.marks = [];
    this.sliptestStudents = [];
    this.existingMarks = [];
    this.getSliptests();
    this.getSubjectStudents();
  }

  getSliptests() {
    this.sliptestService
      .getSliptests(this.selectedSection.id, this.selectedSGS.subjectId)
      .then(sliptests => this.sliptests = sliptests)
      .catch(error => this.error = error);
  }

  sliptestSelected(selectedSliptest) {
    this.selectedSliptest = selectedSliptest;
    this.marks = [];
    this.existingMarks = [];
    this.sliptestStudents = [];
    this.initSliptestStudents();
  }

  getSubjectStudents() {
    this.ssService
      .getSubjectStudent(this.selectedSection.id, this.selectedSGS.subjectId)
      .then(subjectStudent => this.subjectStudent = subjectStudent)
      .catch(error => this.error = error);
  }

  initSliptestStudents() {
    if(typeof this.subjectStudent.studentIds != 'undefined') {
      var intIds = this.subjectStudent.studentIds.split(",").map(Number).filter(Boolean);
      for (let ids of intIds) {
        for (var i = 0; i < this.students.length; i++) {
          if (this.students[i].id == ids) {
            this.sliptestStudents.push(this.students[i]);
            this.initMarks(i);
          }
        }
      }
      this.getMarks();
    }
  }

  getMarks() {
    this.stsService
      .getMarks(this.selectedSliptest.id)
      .then(existingMarks => {
        this.existingMarks = existingMarks;
        if (this.existingMarks.length == 0) {
          this.isMarksPresent = false;
        } else {
          this.isMarksPresent = true;
          this.exportMarks();
        }
      })
      .catch(error => this.error = error);
  }

  initMarks(index: number) {
    var marc = new SliptestScore();
    marc.sliptestId = this.selectedSliptest.id;
    marc.studentId = this.students[index].id;
    marc.grade = '';
    this.marks.push(marc);
  }

  exportMarks() {
    for (var i = 0; i < this.marks.length; i++) {
      for (var j = 0; j < this.existingMarks.length; j++) {
        if (this.existingMarks[j].studentId == this.marks[i].studentId) {
          this.marks[i].id = this.existingMarks[j].id;
          this.marks[i].mark = this.existingMarks[j].mark;
          this.marks[i].grade = this.existingMarks[j].grade;
        }
      }
    }
  }

  defaultMarks() {
    for (var i = 0; i < this.marks.length; i++) {
      if (typeof this.marks[i].mark == 'undefined') {
        this.marks[i].mark = 0;
      }
    }
  }

  clearValues(){
    this.selectedSection = new Section();
    this.selectedCSG = new ClassSubjectGroup();
    this.selectedSGS = new SubjectGroupSubject();
    this.selectedSliptest = new Sliptest();
    this.sections = [];
    this.classSubjectGroups = [];
    this.subjectGroupSubjects = [];
    this.sliptests = [];
    this.marks = [];
    this.students = [];
    this.sliptestStudents = [];
    this.existingMarks = [];
  }

  save() {
    this.defaultMarks();
    if (this.isMarksPresent) {
      this.stsService
        .put(this.marks)
        .then()
        .catch(error => this.error = error)
    } else {
      this.stsService
        .post(this.marks)
        .then()
        .catch(error => this.error = error)
    }
  }

}