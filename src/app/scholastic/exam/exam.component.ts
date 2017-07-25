import { Component, OnInit } 	from '@angular/core';
import { Router }            	from '@angular/router';
import { Clas }               from '../../classroom/class/clas';
import { ClassService }       from '../../classroom/class/class.service';
import { Exam }			 		      from './exam';
import { ExamService }		 	  from './exam.service';
import { CookieService }      from 'angular2-cookie/core';

@Component({
	selector: 'ui-exam',
	templateUrl: './exam.component.html',
	styleUrls: ['./exam.component.css']
})

export class ExamComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  exams: Exam[];
  selectedExam: Exam;
  addingExam = false;
  error: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private classService: ClassService,
    private examService: ExamService) { }

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
    this.getExams(this.selectedClass.id);
    this.cookieService.put("classId", "" + this.selectedClass.id);
    this.cookieService.put("className", this.selectedClass.className);
    this.addingExam = false;
  }

  getExams(id: number) {
    this.examService
      .getExams(id)
      .then(exams => this.exams = exams)
      .catch(error => this.error = error);
  }

  onSelect(exam: Exam) {
    this.selectedExam = exam;
    this.addingExam = false;
  }

  close(savedExam: Exam) {
    this.addingExam = false;
    if (savedExam) { this.getExams(this.selectedClass.id); }
  }

  gotoEdit(exam: Exam, event: any) {
		event.stopPropagation();
		this.router.navigate(['scholastic/exam/edit', exam.id]);
	}

  addExam() {
    if(this.selectedClass.id !== undefined) {
      this.addingExam = true
    }
    this.selectedExam = null;
  }

  deleteExam(exam: Exam, event: any) {
    event.stopPropagation();
    this.examService
      .delete(exam)
      .then(res => {
        this.exams = this.exams.filter(h => h !== exam);
        if (this.selectedExam === exam) { this.selectedExam = null; }
      })
      .catch(error => this.error = error);
  }

}