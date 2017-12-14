import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clas } from '../class/clas';
import { Section } from '../section/section';
import { SubjectTeacher } from '../../topic/subject-teacher/subject-teacher';
import { Attendance } from './attendance';
import { LeaveType } from './leave-type';
import { Session } from './session';
import { Timetable } from '../timetable/timetable';
import { TimetableService } from '../timetable/timetable.service';
import { ClassService } from '../class/class.service';
import { SectionService } from '../section/section.service';
import { AttendanceService } from './attendance.service';
import { CookieService } from 'angular2-cookie/core';
import {saveAs as importedSaveAs} from "file-saver";

@Component({
  selector: 'ui-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})

export class AttendanceComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  dateAttendance: Date;
  timetables: Timetable[];
  periods: number[];
  markedAttendances: Attendance[];
  unmarkedAttendances: Attendance[];
  preparedAttendances: Attendance[];
  leaveTypes = [
	new LeaveType(""),
	new LeaveType("Absent")
  ]
  noAbsenteesTypes = [
  	new LeaveType(""),
	new LeaveType("No Absentees")
  ]
  session: number;
  sessions = [
	new Session("Morning", 0),
	new Session("Afternoon", 1)
  ]
  noAbsentee: String;
  error: any;

  constructor(
	private router: Router,
	private cookieService: CookieService,
	private classService: ClassService,
	private sectionService: SectionService,
	private timetableService: TimetableService,
	private attendanceService: AttendanceService) { }

  ngOnInit() {
	this.getClasses();
	this.selectedClass = new Clas();
	this.selectedSection = new Section();
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
	this.timetables = [];
	this.periods = [];
	this.selectedSection = new Section();
	this.getSections(this.selectedClass.id);
	this.cookieService.put("classId", "" + this.selectedClass.id);
	this.cookieService.put("className", this.selectedClass.className);
	this.markedAttendances = null;
	this.unmarkedAttendances = null;
	this.noAbsentee = "";
  }

  getSections(id: number) {
	this.sectionService
	  .getSections(id)
	  .then(sections => this.sections = sections)
	  .catch(error => this.error = error);
  }

  sectionSelected(selectedSection) {
  	this.selectedSection = selectedSection;
	this.timetables = [];
	this.periods = [];
	this.cookieService.put("sectionId", "" + this.selectedSection.id);
	this.cookieService.put("sectionName", this.selectedSection.sectionName);
	this.getTimetable(this.selectedSection.id);
	this.markedAttendances = null;
	this.unmarkedAttendances = null;
	this.noAbsentee = "";
  }

  getTimetable(sectionId: number) {
	this.timetableService
	  .getTimetables(sectionId)
	  .then(timetables => {
		this.timetables = timetables;
		this.getPeriods();
	  })
	  .catch(error => this.error = error);
  }

  getPeriods() {
	for (let timetable of this.timetables) {
	  this.periods.push(timetable.periodNo);
	}
  }

  downloadAttendance() {
	this.attendanceService
	.downloadAttendance(this.selectedClass.className, this.selectedSection.sectionName, this.selectedSection.id, this.dateAttendance)
	.subscribe(data => {
		const blob = new Blob([data],
        { type: 'application/vnd.ms-excel' });
    	const file = new File([blob], 'attendance.xlsx',
        { type: 'application/vnd.ms-excel' });
    	importedSaveAs(file);
	})
  }

  fetchAttendance() {
  	this.noAbsentee = "";
	this.markedAttendances = [];
	this.unmarkedAttendances = [];
	this.getMarkedAttendance(this.selectedSection.id, this.dateAttendance);
	this.getUnmarkedAttendance(this.selectedSection.id, this.dateAttendance);
  }

  fetchSessionAttendance() {
  	this.noAbsentee = "";
	this.markedAttendances = [];
	this.unmarkedAttendances = [];
	this.getMarkedSessionAttendance(this.session, this.selectedSection.id, this.dateAttendance);
	this.getUnmarkedSessionAttendance(this.session, this.selectedSection.id, this.dateAttendance);
  }

  delete(attendance: Attendance, event: any) {
	event.stopPropagation();
	this.attendanceService
	  .delete(attendance)
	  .then(() => {
		if (this.selectedClass.attendanceType == 'Daily') {
		  this.fetchAttendance();
		} else if (this.selectedClass.attendanceType == 'Session') {
		  this.fetchSessionAttendance();
		} else if (this.selectedClass.attendanceType == 'Period') {
		  this.fetchSessionAttendance();
		}
	  })
	  .catch(error => this.error = error);
  }

  prepareMarkedAttendance() {
	for (let att of this.unmarkedAttendances) {
	  if (att.typeOfLeave == 'Absent') {
		this.preparedAttendances.push(att);
	  }
	}
  }

  save() {
	event.stopPropagation();
	this.preparedAttendances = [];
	this.prepareMarkedAttendance();
	this.attendanceService
	  .post(this.preparedAttendances)
	  .then(() => {
		if (this.selectedClass.attendanceType == 'Daily') {
		  this.fetchAttendance();
		} else if (this.selectedClass.attendanceType == 'Session') {
		  this.fetchSessionAttendance();
		} else if (this.selectedClass.attendanceType == 'Period') {
		  this.fetchSessionAttendance();
		}
	  })
	  .catch(error => this.error = error);
  }

  noAbsentees() {
  	let attendance:Attendance = new Attendance();
  	attendance.id = 0;
  	attendance.sectionId = this.selectedSection.id;
  	attendance.type = this.selectedClass.attendanceType;
  	if(this.selectedClass.attendanceType == "Daily") {
  		attendance.session = 0;	
  	} else {
  		attendance.session = this.session;
  	}
  	attendance.dateAttendance = this.dateAttendance;
  	attendance.typeOfLeave = 'NA';
  	this.attendanceService
  		.noAbsentees(attendance)
  		.then(returnedAttendance => {
  			this.markedAttendances = [];
			this.markedAttendances[0] = returnedAttendance;
			this.checkNoAbsentees();
	  	})
  		.catch(error => this.error = error)
  }

  clearAttendance() {
  	let attendance:Attendance = new Attendance();
  	attendance.sectionId = this.selectedSection.id;
  	attendance.type = this.selectedClass.attendanceType;
  	if(this.selectedClass.attendanceType == "Daily") {
  		attendance.session = 0;	
  	} else {
  		attendance.session = this.session;
  	}
  	attendance.dateAttendance = this.dateAttendance;
  	this.attendanceService
  		.deleteWhole(attendance)
  		.catch(error => this.error = error)
  }

  getMarkedAttendance(sectionId: number, date: Date) {
	this.attendanceService
	  .dailyAttendanceMarked(sectionId, date)
	  .then(attendances => {
		this.markedAttendances = attendances;
		this.checkNoAbsentees();
	  })
	  .catch(error => this.error = error)
  }

  getUnmarkedAttendance(sectionId: number, date: Date) {
	this.attendanceService
	  .dailyAttendanceUnmarked(sectionId, date)
	  .then(attendances => {
		this.unmarkedAttendances = attendances;
	  })
	  .catch(error => this.error = error)
  }

  getMarkedSessionAttendance(session: number, sectionId: number, date: Date) {
	this.attendanceService
	  .sessionAttendanceMarked(session, sectionId, date)
	  .then(attendances => {
		this.markedAttendances = attendances;
		this.checkNoAbsentees();
	  })
	  .catch(error => this.error = error)
  }

  getUnmarkedSessionAttendance(session: number, sectionId: number, date: Date) {
	this.attendanceService
	  .sessionAttendanceUnmarked(session, sectionId, date)
	  .then(attendances => {
		this.unmarkedAttendances = attendances;
	  })
	  .catch(error => this.error = error)
  }

  checkNoAbsentees() {
  	if(this.markedAttendances.length == 1 && this.markedAttendances[0].typeOfLeave == 'NA') {
  		this.noAbsentee = "No Absentees"
  	}
  }

}