import { Component, OnInit }          from '@angular/core';
import { Router }                     from '@angular/router';
import { Clas }                       from '../../classroom/class/clas';
import { Section }			              from '../../classroom/section/section';
import { Teacher }                    from '../../people/teacher/teacher';
import { TeacherService }             from '../../people/teacher/teacher.service';
import { SubjectTeacher }		          from './subject-teacher'
import { ClassService }               from '../../classroom/class/class.service';
import { SectionService }		          from '../../classroom/section/section.service';
import { SubjectTeacherService }      from './subject-teacher.service';
import { CookieService }		          from 'angular2-cookie/core';

@Component({
  selector: 'ui-subject-teacher',
  templateUrl: './subject-teacher.component.html',
  styleUrls: ['./subject-teacher.component.css']
})

export class SubjectTeacherComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  teachers: Teacher[];
  subjectTeachers: SubjectTeacher[];
  selectedSubjectTeacher: SubjectTeacher;
  addingSubjectTeacher = false;
  error: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private classService: ClassService,
    private sectionService: SectionService,
    private teacherService: TeacherService,
    private subjectTeacherService: SubjectTeacherService) { 
  }

  ngOnInit() {
    this.getClasses();
    this.selectedClass = new Clas(0, "");
    this.selectedSection = new Section(0, "");
    this.getTeachers();
  }

  getTeachers() {
    this.teacherService
      .getTeachers()
      .then(teachers => this.teachers = teachers)
      .catch(error => this.error = error);
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
    this.getSections(this.selectedClass.id);
    this.cookieService.put("classId", "" + this.selectedClass.id);
    this.cookieService.put("className", this.selectedClass.className);
    this.addingSubjectTeacher = true;
    this.subjectTeachers = null;
  }

  getSections(id: number) {
    this.sectionService
      .getSections(id)
      .then(sections => this.sections = sections)
      .catch(error => this.error = error);
  }

  sectionSelected(selectedSection) {
    this.selectedSection = selectedSection;
    this.getSubjectTeachers(this.selectedSection.id);
    this.cookieService.put("sectionId", "" + this.selectedSection.id);
    this.cookieService.put("sectionName", this.selectedSection.sectionName);
  }

  getSubjectTeachers(id: number) {
    this.subjectTeacherService
      .getSubjectTeachers(id)
      .then(subjectTeachers => this.subjectTeachers = subjectTeachers)
      .catch(error => this.error = error);
  }

  onSelect(subjectTeacher: SubjectTeacher) {
    this.selectedSubjectTeacher = subjectTeacher;
    this.addingSubjectTeacher = false;
  }

  close(savedSubjectTeacher: SubjectTeacher) {
    this.addingSubjectTeacher = false;
    //if (savedSubjectTeacher) { this.getSubjectTeachers(this.selectedSection.id); }
  }

  setupSubjectTeacher() {
    this.subjectTeacherService.save(this.selectedClass);
  }

  updateSubjectTeacher() {
    this.subjectTeacherService.update(this.subjectTeachers);
  }

  teacherSelected(teacherId) {
    for (var i = 0; i < this.teachers.length; i++) {
      if (this.teachers[i].id == teacherId) {
        this.selectedSubjectTeacher.teacherId = this.teachers[i].id;
        this.selectedSubjectTeacher.teacherName = this.teachers[i].name;
      }
    }
  }

  gotoEdit(subjectTeacher: SubjectTeacher, event: any) {
    event.stopPropagation();
    //this.router.navigate(['topic/subject-teacher/edit', subjectTeacher.id]);
    this.subjectTeacherService
      .put(subjectTeacher)
      .then(subjectTeacher => {
      })
      .catch(error => this.error = error);
  }

  deleteSubjectTeacher(subjectTeacher: SubjectTeacher, event: any) {
    event.stopPropagation();
    this.subjectTeacherService
      .delete(subjectTeacher)
      .then(res => {
        this.subjectTeachers = this.subjectTeachers.filter(h => h !== subjectTeacher);
        if (this.selectedSubjectTeacher === subjectTeacher) { this.selectedSubjectTeacher = null; }
      })
      .catch(error => this.error = error);
  }

}