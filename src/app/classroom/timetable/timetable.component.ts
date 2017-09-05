import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clas } from '../class/clas';
import { Section } from '../section/section';
import { SubjectTeacher } from '../../topic/subject-teacher/subject-teacher';
import { Timetable } from './timetable';
import { ClassService } from '../class/class.service';
import { SectionService } from '../section/section.service';
import { TimetableService } from './timetable.service';
import { Subjects } from '../../topic/subjects/subjects';
import { SubjectsService } from '../../topic/subjects/subjects.service';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'ui-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})

export class TimetableComponent {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  selectingSection = false;
  newTimetable: Timetable;
  isNewTimetable: boolean = false;
  timetables: Timetable[];
  selectedTimetable: Timetable[];
  selectedDay: string;
  days: string[];
  subjects: Subjects[];
  addingTimetable = false;
  error: any;

  constructor(
	private router: Router,
	private cookieService: CookieService,
	private classService: ClassService,
	private sectionService: SectionService,
	private timetableService: TimetableService,
	private subjectsService: SubjectsService) {
  }

  ngOnInit() {
	this.getClasses();
	this.selectedClass = new Clas(0, "");
	this.selectedSection = new Section(0, "");
	this.selectedDay = "";
  }

  getClasses() {
	this.classService
	  .getClasses()
	  .then(classes => this.classes = classes)
	  .catch(error => this.error = error);
  }

  classSelected(selectedClass) {
	this.selectedClass = selectedClass;
	this.sections = [];
	this.selectedSection = new Section();
	this.isNewTimetable = false;
	this.getSections(this.selectedClass.id);
	this.getSubjects(this.selectedClass.id);
	this.selectingSection = false;
	this.timetables = [];
	this.selectedTimetable = [];
	this.selectedDay = "";
	this.days = [];
	this.addingTimetable = false;
  }

  getSections(id: number) {
	this.sectionService
	  .getSections(id)
	  .then(sections => this.sections = sections)
	  .catch(error => this.error = error);
  }

  sectionSelected(selectedSection) {
	this.selectedSection = selectedSection;
	this.isNewTimetable = false;
	this.selectingSection = true;
	this.timetables = [];
	this.selectedTimetable = [];
	this.selectedDay = "";
	this.days = [];
	this.getTimetable(this.selectedSection.id);
	this.addingTimetable = true;
  }

  getTimetable(sectionId: number) {
	this.timetableService
	  .getTimetables(sectionId)
	  .then(timetables => {
		this.timetables = timetables;
		this.days = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	  })
	  .catch(error => this.error = error);
  }

  daySelected(day: string) {
	this.selectedTimetable = [];
	this.selectedDay = day;
	for (let timetab of this.timetables) {
	  if (timetab.dayOfWeek == day) {
		this.selectedTimetable.push(timetab);
	  }
	}
	if(day == "") {
		this.isNewTimetable = false;
	}
  }

  getSubjects(id: number) {
	this.subjectsService
	  .getClassSubjects(id)
	  .then(subjects => this.subjects = subjects)
	  .catch(error => this.error = error);
  }

  save(timetable: Timetable, event: any) {
	event.stopPropagation();
	this.timetableService
	  .save(timetable)
	  .then(() => {
		// this.selectedDay = "";
		// this.days = [];
		// this.timetables = [];
		// this.selectedTimetable = [];
		// this.getTimetable(this.selectedSection.id);
	  })
	  .catch(error => this.error = error);

  }

  insert() {
	this.timetableService
	  .save(this.newTimetable)
	  .then(() => {
		this.goBack();
		this.selectedDay = "";
		this.days = [];
		this.timetables = [];
		this.selectedTimetable = [];
		this.getTimetable(this.selectedSection.id);
	  })
	  .catch(error => this.error = error);
  }

  delete(timetable: Timetable, event: any) {
	event.stopPropagation();
	this.timetableService
	  .delete(timetable)
	  .then(() => {
		this.selectedDay = "";
		this.days = [];
		this.timetables = [];
		this.selectedTimetable = [];
		this.getTimetable(this.selectedSection.id);
	  })
	  .catch(error => this.error = error);
  }

  add() {
	this.newTimetable = new Timetable();
	this.newTimetable.sectionId = this.selectedSection.id;
	this.newTimetable.dayOfWeek = this.selectedDay;
	this.enableNewTimetable();
  }

  enableNewTimetable() {
	if (this.selectedDay !== "") {
	  this.isNewTimetable = true;
	}
  }

  addDayTimetable() {
  	this.timetableService.postWeekdayTimetable(this.selectedClass.id, this.selectedSection.id);
  }

  copyTimetable() {
  	this.timetableService.copyTimetable(this.selectedClass.id, this.selectedSection.id);
  }

  addSaturdayTimetable() {
	this.timetableService.postSaturdayTimetable(this.selectedClass.id, this.selectedSection.id);
  }

  goBack() {
	this.newTimetable = null;
	this.isNewTimetable = false;
  }

}