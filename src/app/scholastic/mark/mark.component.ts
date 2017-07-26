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
import { Mark }                 from './mark';
import { MarkService }          from './mark.service';
import { CookieService }		    from 'angular2-cookie/core';

@Component({
  selector: 'ui-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})

export class MarkComponent implements OnInit {
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
  marks: Mark[];
  existingMarks: Mark[];
  isMarksPresent: Boolean;
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
    private markService: MarkService) { 
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
    this.examStudents = [];
    this.marks = [];
    this.students = [];
    this.existingMarks = [];
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
    this.examStudents = [];
    this.marks = [];
    this.existingMarks = [];
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
    this.marks = [];
    this.existingMarks = [];
    this.examStudents = [];
    this.getSubjectStudents();
  }

  getSubjectStudents() {
    this.ssService
      .getSubjectStudent(this.selectedSection.id, this.selectedExamSubject.subjectId)
      .then(subjectStudent => {
        this.subjectStudent = subjectStudent;
        this.initExamStudents();
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
            this.initMarks(i);
          }
        }
      }
      this.getMarks();
    }
  }

  getMarks() {
    this.markService
      .getMarks(this.selectedExam.id, this.selectedExamSubject.subjectId, this.selectedSection.id)
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
    var marc = new Mark();
    marc.examId = this.selectedExam.id;
    marc.subjectId = this.selectedExamSubject.subjectId;
    marc.sectionId = this.selectedSection.id;
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

  clearValues() {
    this.sections = [];
    this.selectedSection = new Section();
    this.selectedExam = new Exam();
    this.selectedExamSubject = new ExamSubject();
    this.exams = [];
    this.examStudents = [];
    this.examSubjects = [];
    this.marks = [];
    this.students = [];
    this.existingMarks = [];
  }

  save() {
    this.defaultMarks();
    if (this.isMarksPresent) {
      this.markService
        .put(this.marks)
        .then()
        .catch(error => this.error = error)
    } else {
      this.markService
        .post(this.marks)
        .then()
        .catch(error => this.error = error)
    }
  }

}