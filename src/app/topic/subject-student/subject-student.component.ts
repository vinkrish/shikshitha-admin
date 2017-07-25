import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { Clas }                 from '../../classroom/class/clas';
import { Section }			        from '../../classroom/section/section';
import { Student }				      from '../../people/student/student';
import { ClassService }         from '../../classroom/class/class.service';
import { SectionService }		    from '../../classroom/section/section.service';
import { StudentService }       from '../../people/student/student.service';
import { ClassSubjectGroup }    from '../class-subject-group/class-subject-group';
import { ClassSubjectGroupService }  from '../class-subject-group/class-subject-group.service';
import { SubjectGroupSubject }  from '../subject-group-subject/subject-group-subject';
import { SubjectGroupSubjectService }  from '../subject-group-subject/subject-group-subject.service';
import { SubjectStudents }      from './subject-students';
import { SubjectStudent }       from './subject-student';
import { SubjectStudentService }from './subject-student.service';
import { CookieService }		    from 'angular2-cookie/core';

@Component({
  selector: 'ui-subject-student',
  templateUrl: './subject-student.component.html',
  styleUrls: ['./subject-student.component.css']
})

export class SubjectStudentComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  students: Student[];
  ssList: SubjectStudent[];
  clasSubjectGroups: ClassSubjectGroup[];
  selectedCSG: ClassSubjectGroup;
  subjectGroupSubjects: SubjectGroupSubject[];
  selectedSGS: SubjectGroupSubject;
  subjectStudents: SubjectStudents[];
  subjectStudentsEdit: SubjectStudents[];
  //tempIds: number[];
  error: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private classService: ClassService,
    private sectionService: SectionService,
    private studentService: StudentService,
    private csgService: ClassSubjectGroupService,
    private sgsService: SubjectGroupSubjectService,
    private ssService: SubjectStudentService) { 
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
    this.getStudents(this.selectedSection.id);
  }

  getClassSubjectGroups(id: number) {
    this.csgService
      .getClassSubjectGroups(id)
      .then(clasSubjectGroups => this.clasSubjectGroups = clasSubjectGroups)
      .catch(error => this.error = error);
  }

  subjectGroupSelected(selectedCSG){
     this.selectedCSG = selectedCSG;
     this.getSubjectGroupSubjects(this.selectedCSG.subjectGroupId);
     this.getSubjectStudents();
   }

  getSubjectGroupSubjects(id: number) {
      this.sgsService
          .getSubjectGroupSubjects(id)
          .then(subjectGroupSubjects => {
            this.subjectGroupSubjects = subjectGroupSubjects;
          })
          .catch(error => this.error = error);
    }

  subjectGroupSubjectSelected(selectedSGS){
      this.selectedSGS = selectedSGS;
      for(var i=0; i<this.ssList.length; i++){
        this.ssList[i].subjectId = selectedSGS.subjectId;
    }
  }

  getStudents(id: number) {
    this.studentService
      .getStudents(id)
      .then(students => {
        this.students = students;
        this.ssList = [];
        for(var i=0; i<this.students.length; i++){
          this.ssList.push(new SubjectStudent(
            this.students[i].rollNo, 
            this.students[i].id, 
            this.students[i].name));
        }
      })
      .catch(error => this.error = error);
  }

  getSubjectStudents() {
    this.ssService
      .getSubjectStudents(this.selectedSection.id, this.selectedCSG.subjectGroupId)
      .then(subjectStudents => {
        this.subjectStudents = subjectStudents;
        this.UpdateSubjectStudentsView();
      })
      .catch(error => this.error = error);
  }

  UpdateSubjectStudentsView() {
    for(var i=0; i<this.subjectStudents.length; i++) {
      //var ids: number[] = this.subjectStudents[i].studentIds.split(",");
      var intIds = this.subjectStudents[i].studentIds.split(",").map(Number).filter(Boolean); 
      for(let ids of intIds) {
        for(var j=0; j<this.ssList.length; j++) {
          if(this.ssList[j].studentId == ids) {
            this.ssList[j].subjectId = this.subjectStudents[i].subjectId;
          }
        }
      }
    }
  }

  clearValues() {
    this.selectedSection = new Section();
    this.selectedCSG = new ClassSubjectGroup();
    this.subjectStudents = [];
    this.ssList = [];
    this.subjectGroupSubjects = [];
    this.selectedSGS = new SubjectGroupSubject();
    this.subjectStudentsEdit = [];
    this.students = [];
  }
  
  updateMapping() {
    for(var i = 0; i < this.subjectGroupSubjects.length; i++) {
      var tempIds = new Array();
      for(var j=0; j<this.ssList.length; j++){
        if(this.subjectGroupSubjects[i].subjectId == this.ssList[j].subjectId) {
          tempIds.push(this.ssList[j].studentId);
        }
      }
      var ids = tempIds.map(o => o).join(',');
      var ss:SubjectStudents = new SubjectStudents();
      ss.sectionId = this.selectedSection.id;
      ss.subjectId = this.subjectGroupSubjects[i].subjectId;
      ss.studentIds = ids;
      this.subjectStudentsEdit.push(ss);
    }
    this.save();
  }

  save() {
    this.ssService
      .post(this.subjectStudentsEdit)
      .then(() => this.subjectStudentsEdit = [])
      .catch(error => this.error = error);
  }

}