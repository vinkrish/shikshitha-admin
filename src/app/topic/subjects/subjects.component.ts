import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subjects } from './subjects';
import { SubjectsService } from './subjects.service';

@Component({
  selector: 'ui-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})

export class SubjectsComponent implements OnInit {
  subjects: Subjects[];
  selectedSubject: Subjects;
  addingSubject = false;
  error: any;

  constructor(
	private router: Router,
	private subjectsService: SubjectsService) {
  }

  ngOnInit() {
	this.getSubjects();
  }

  getSubjects() {
	this.subjectsService
	  .getSubjects()
	  .then(subjects => this.subjects = subjects)
	  .catch(error => this.error = error);
  }

  onSelect(subject: Subjects) {
	this.selectedSubject = subject;
	this.addingSubject = false;
  }

  close(savedClass: Subjects) {
	console.log("class component close function");
	this.addingSubject = false;
	if (savedClass) { this.getSubjects(); }
  }

  addSubject() {
	this.addingSubject = true;
	this.selectedSubject = null;
  }

  gotoEdit(subject: Subjects, event: any) {
	event.stopPropagation();
	this.router.navigate(['topic/subject/edit', subject.id]);
  }

  deleteSubject(subject: Subjects, event: any) {
	event.stopPropagation();
	this.subjectsService
	  .delete(subject)
	  .then(res => {
		this.subjects = this.subjects.filter(h => h !== subject);
		if (this.selectedSubject === subject) { this.selectedSubject = null; }
	  })
	  .catch(error => this.error = error);
  }

}