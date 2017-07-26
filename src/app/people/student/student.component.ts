import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { Clas }                 from '../../classroom/class/clas';
import { Section }			        from '../../classroom/section/section';
import { Student }				      from './student'
import { ClassService }         from '../../classroom/class/class.service';
import { SectionService }		    from '../../classroom/section/section.service';
import { StudentService }       from './student.service';
import { CookieService }		    from 'angular2-cookie/core';

@Component({
  selector: 'ui-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  selectingSection = false;
  students: Student[];
  selectedStudent: Student;
  addingStudent = false;
  error: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private classService: ClassService,
    private sectionService: SectionService,
    private studentService: StudentService) { 
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

  onSelect(student: Student) {
    this.selectedStudent = student;
    this.addingStudent = false;
  }

  close(savedStudent: Student) {
    this.addingStudent = false;
    if (savedStudent) { this.getStudents(this.selectedSection.id); }
  }
  
  addStudent() {
    if (this.selectingSection) {
      if (this.addingStudent) {
        this.addingStudent = false;
      } else {
        this.addingStudent = true;
      }
    }
    this.selectedStudent = null;
  }

  gotoEdit(student: Student, event: any) {
    event.stopPropagation();
    this.router.navigate(['people/student/edit', student.id]);
  }

  deleteStudent(student: Student, event: any) {
    event.stopPropagation();
    this.studentService
      .delete(student)
      .then(res => {
        this.students = this.students.filter(h => h !== student);
        if (this.selectedStudent === student) { this.selectedStudent = null; }
      })
      .catch(error => this.error = error);
  }

}