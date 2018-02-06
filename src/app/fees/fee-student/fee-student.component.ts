import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { Clas }                 from '../../classroom/class/clas';
import { Section }			        from '../../classroom/section/section';
import { FeeStudent }				    from './fee-student'
import { ClassService }         from '../../classroom/class/class.service';
import { SectionService }		    from '../../classroom/section/section.service';
import { FeeStudentService }    from './fee-student.service';
import { CookieService }		    from 'angular2-cookie/core';

@Component({
  selector: 'ui-fee-student',
  templateUrl: './fee-student.component.html',
  styleUrls: ['./fee-student.component.css']
})

export class FeeStudentComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  selectingSection = false;
  students: FeeStudent[];
  selectedStudent: FeeStudent;
  addingStudent = false;
  studentId: number;
  error: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private classService: ClassService,
    private sectionService: SectionService,
    private studentService: FeeStudentService) { 
  }

  ngOnInit() {
    this.getClasses();
    this.selectedClass = new Clas(0, "");
    this.selectedSection = new Section(0, "");
  }

  getClasses() {
    this.classService
      .getClasses()
      .then(classes => this.classes = classes)
      .catch(error => this.error = error);
    }

  classSelected(selectedClass) {
    this.selectedSection = new Section(0, "");
    this.sections = [];
    this.selectedClass = selectedClass;
    this.getSections(this.selectedClass.id);
    this.cookieService.put("classId", "" + this.selectedClass.id);
    this.cookieService.put("className", this.selectedClass.className);
    this.addingStudent = false;
    this.selectingSection = false;
    this.students = null;
  }

  getSections(id: number) {
    this.sectionService
      .getSections(id)
      .then(sections => this.sections = sections)
      .catch(error => this.error = error);
  }

  sectionSelected(selectedSection) {
    this.selectedSection = selectedSection;
    this.getStudents(this.selectedSection.id);
    this.cookieService.put("sectionId", "" + this.selectedSection.id);
    this.cookieService.put("sectionName", this.selectedSection.sectionName);
    this.addingStudent = false;
    this.selectingSection = true;
  }

  getStudents(id: number) {
    this.studentService
      .getStudents(id)
      .then(students => this.students = students)
      .catch(error => this.error = error);
  }

  onSelect(student: FeeStudent) {
    this.selectedStudent = student;
    this.addingStudent = false;
  }

  close(savedStudent: FeeStudent) {
    this.addingStudent = false;
    if (savedStudent) { this.getStudents(this.selectedSection.id); }
  }

  update(student: FeeStudent, event: any) {
    event.stopPropagation();
    this.studentService
      .save(student)
      .then(() => {;
      })
      .catch(error => this.error = error);
  }

  refreshFees(event) {
    this.getStudents(this.selectedSection.id);
  }

  detail(student: FeeStudent, event: any) {
    event.stopPropagation();
    this.studentId = student.id;
    this.cookieService.put("studentId", "" + student.id);
    this.cookieService.put("studentName", student.name);
    //this.router.navigate(['fees/fee-transaction']);
  }

}