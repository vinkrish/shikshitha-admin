import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';
import { Clas }                     from '../../classroom/class/clas';
import { Section }                  from '../../classroom/section/section';
import { Student }                  from '../../people/student/student';
import { CceStudentProfile }        from './cce-student-profile';
import { ClassService }             from '../../classroom/class/class.service';
import { SectionService }           from '../../classroom/section/section.service';
import { StudentService }           from '../../people/student/student.service';
import { CceStudentProfileService } from './cce-student-profile.service';
import { CookieService }            from 'angular2-cookie/core';

@Component({
  selector: 'ui-cce-student-profile',
  templateUrl: './cce-student-profile.component.html',
  styleUrls: ['./cce-student-profile.component.css']
})

export class CceStudentProfileComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  students: Student[];
  term: number;
  totalDays: number;
  fromDate: string;
  toDate: string;
  cceProfiles: CceStudentProfile[];
  existingCceProfiles: CceStudentProfile[];
  isProfilePresent: Boolean;
  error: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private classService: ClassService,
    private sectionService: SectionService,
    private studentService: StudentService,
    private cceProfileService: CceStudentProfileService) { }

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
  }

  getSections(id: number) {
    this.sectionService
      .getSections(id)
      .then(sections => this.sections = sections)
      .catch(error => this.error = error);
  }

  sectionSelected(selectedSection) {
    this.selectedSection = selectedSection;
    this.cceProfiles = [];
    this.existingCceProfiles = [];
    this.students = [];
    this.getStudents(this.selectedSection.id);
  }

  getStudents(id: number) {
    this.studentService
      .getStudents(id)
      .then(students => {
        this.students = students;
        this.initCceProfileStudents();
      })
      .catch(error => this.error = error);
  }

  initCceProfileStudents() {
    for (var i = 0; i < this.students.length; i++) {
        this.initCceProfile(i);
    }
  }

  initCceProfile(index: number) {
    var profile = new CceStudentProfile();
    profile.sectionId = this.selectedSection.id;
    profile.studentId = this.students[index].id;
    profile.bloodGroup = "";
    profile.visionLeft = "";
    profile.visionRight = "";
    profile.healthStatus = "";
    profile.ailment = "";
    profile.oralHygiene = "";
    this.cceProfiles.push(profile);
  }

  getCceProfiles() {
    this.cceProfileService
      .getCceProfiles(this.selectedSection.id, 1)
      .then(existingCceProfiles => {
        this.existingCceProfiles = existingCceProfiles;
        if (this.existingCceProfiles.length == 0) {
          this.isProfilePresent = false;
        } else {
          this.isProfilePresent = true;
          this.exportCceProfiles();
        }
      })
      .catch(error => this.error = error);
  }

  exportCceProfiles() {
    for (var i = 0; i < this.cceProfiles.length; i++) {
      for (var j = 0; j < this.existingCceProfiles.length; j++) {
        if (this.existingCceProfiles[j].studentId == this.cceProfiles[i].studentId) {
          this.cceProfiles[i].id = this.existingCceProfiles[j].id;
          this.cceProfiles[i].term = this.existingCceProfiles[j].term;
          this.cceProfiles[i].fromDate = this.existingCceProfiles[j].fromDate;
          this.cceProfiles[i].toDate = this.existingCceProfiles[j].toDate;
          this.cceProfiles[i].totalDays = this.existingCceProfiles[j].totalDays;
          this.cceProfiles[i].daysAttended = this.existingCceProfiles[j].daysAttended;
          this.cceProfiles[i].height = this.existingCceProfiles[j].height;
          this.cceProfiles[i].weight = this.existingCceProfiles[j].weight;
          this.cceProfiles[i].bloodGroup = this.existingCceProfiles[j].bloodGroup;
          this.cceProfiles[i].healthStatus = this.existingCceProfiles[j].healthStatus;
          this.cceProfiles[i].visionLeft = this.existingCceProfiles[j].visionLeft;
          this.cceProfiles[i].visionRight = this.existingCceProfiles[j].visionRight;
          this.cceProfiles[i].ailment = this.existingCceProfiles[j].ailment;
          this.cceProfiles[i].oralHygiene = this.existingCceProfiles[j].oralHygiene;
        }
      }
    }
  }

  defaultValues() {
    for (var i = 0; i < this.cceProfiles.length; i++) {
        this.cceProfiles[i].term = this.term;
        this.cceProfiles[i].totalDays = this.totalDays;
        this.cceProfiles[i].fromDate = this.fromDate;
        this.cceProfiles[i].toDate = this.toDate;
      if (typeof this.cceProfiles[i].daysAttended == 'undefined') {
        this.cceProfiles[i].daysAttended = 0;
      }
      if (typeof this.cceProfiles[i].height == 'undefined') {
        this.cceProfiles[i].height = 0;
      }
      if (typeof this.cceProfiles[i].weight == 'undefined') {
        this.cceProfiles[i].weight = 0;
      }
    }
  }

  clearValues(){
    this.selectedSection = new Section();
    this.sections = [];
    this.cceProfiles = [];
    this.students = [];
    this.existingCceProfiles = [];
  }

  save() {
    this.defaultValues();
    if (this.isProfilePresent) {
      this.cceProfileService
        .put(this.cceProfiles)
        .then()
        .catch(error => this.error = error)
    } else {
      this.cceProfileService
        .post(this.cceProfiles)
        .then()
        .catch(error => this.error = error)
    }
  }

}