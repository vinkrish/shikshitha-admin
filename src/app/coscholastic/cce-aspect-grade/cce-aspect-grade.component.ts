import { Component, OnInit }     from '@angular/core';
import { Router }                from '@angular/router';
import { Clas }                  from '../../classroom/class/clas';
import { Section }               from '../../classroom/section/section';
import { Student }               from '../../people/student/student';
import { ClassService }          from '../../classroom/class/class.service';
import { SectionService }        from '../../classroom/section/section.service';
import { StudentService }        from '../../people/student/student.service';
import { CceCoscholastic }       from '../cce-coscholastic/cce-coscholastic';
import { CceSectionHeading }     from '../cce-section-heading/cce-section-heading';
import { CceTopicPrimary }		   from '../cce-topic-primary/cce-topic-primary';
import { CceAspectPrimary }      from '../cce-aspect-primary/cce-aspect-primary';
import { CceCoscholasticService }from '../cce-coscholastic/cce-coscholastic.service';
import { SectionHeadingService } from '../cce-section-heading/cce-section-heading.service';
import { TopicPrimaryService }   from '../cce-topic-primary/cce-topic-primary.service';
import { AspectPrimaryService }  from '../cce-aspect-primary/cce-aspect-primary.service';
import { CceAspectGrade }        from './cce-aspect-grade';
import { AspectGradeService }    from './cce-aspect-grade.service';

@Component({
  selector: 'ui-cce-aspect-grade',
  templateUrl: './cce-aspect-grade.component.html',
  styleUrls: ['./cce-aspect-grade.component.css']
})

export class AspectGradeComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  students: Student[];
  coscholastics: CceCoscholastic[];
  selectedCosch: CceCoscholastic;
  sectionHeadings: CceSectionHeading[];
  selectedSectionHeading: CceSectionHeading;
  topicPrimarys: CceTopicPrimary[];
  selectedTopicPrimary: CceTopicPrimary;
  aspectPrimary: CceAspectPrimary;
  aspects: CceAspectPrimary[];
  selectedAspect: CceAspectPrimary;
  term: number;
  grades: CceAspectGrade[];
  existingGrades: CceAspectGrade[];
  isGradePresent: Boolean;
  error: any;

  constructor(
    private router: Router,
    private classService: ClassService,
    private sectionService: SectionService,
    private studentService: StudentService,
    private coschService: CceCoscholasticService,
    private sectionHeadingService: SectionHeadingService,
    private topicPrimaryService: TopicPrimaryService,
    private aspectPrimaryService: AspectPrimaryService,
    private aspectGradeService: AspectGradeService) { }

  ngOnInit() {
    this.getClasses();
    this.selectedClass = new Clas();
    this.getCoscholastics();
    this.clearValues();
  }

  clearValues() {
    this.selectedSection = new Section();
    this.students = [];
    this.grades = [];
    this.existingGrades = [];
    this.selectedCosch = new CceCoscholastic();
    this.selectedSectionHeading = new CceSectionHeading();
    this.selectedTopicPrimary = new CceTopicPrimary();
    this.selectedAspect = new CceAspectPrimary();
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
    this.students = [];
    this.grades = [];
    this.existingGrades = [];
  }

  getStudents(id: number) {
    this.studentService
      .getStudents(id)
      .then(students => {
        this.students = students;
        this.initGrades();
      })
      .catch(error => this.error = error);
  }

  getCoscholastics() {
    this.coschService
      .getCceCoscholastics()
      .then(coscholastics => this.coscholastics = coscholastics)
      .catch(error => this.error = error);
    }

  coschSelected(selectedCosch) {
    this.selectedCosch = selectedCosch;
    this.aspects = null;
    this.getSectionHeadings(this.selectedCosch.id);
    this.selectedSectionHeading = new CceSectionHeading();
    this.selectedTopicPrimary = new CceTopicPrimary();
    this.topicPrimarys = null;
  }

  getSectionHeadings(coscholasticId) {
    this.sectionHeadingService
      .getSectionHeadings(coscholasticId)
      .then(sectionHeadings => this.sectionHeadings = sectionHeadings)
      .catch(error => this.error = error);
  }

  sectionHeadingSelected(selectedSectionHeading) {
    this.selectedSectionHeading = selectedSectionHeading;
    this.aspects = null;
    this.selectedTopicPrimary = new CceTopicPrimary();
    this.getTopicPrimarys(this.selectedSectionHeading.id);
  }

  getTopicPrimarys(id: number) {
    this.topicPrimaryService
      .getTopicPrimarys(id)
      .then(topicPrimarys => this.topicPrimarys = topicPrimarys)
      .catch(error => this.error = error);
  }

  topicSelected(selectedTopicPrimary) {
    this.selectedTopicPrimary = selectedTopicPrimary;
    this.aspects = null;
    this.getAspects(this.selectedTopicPrimary.id);
  }

  getAspects(id: number) {
    this.aspectPrimaryService
      .getAspectPrimarys(id)
      .then(aspectPrimarys => this.aspects = aspectPrimarys)
      .catch(error => this.error = error);
  }

  aspectSelected(selectedAspect) {
    this.selectedAspect = selectedAspect;
  }

  getGrades() {
    this.getStudents(this.selectedSection.id);
  }

  initGrades() {
    for (var i = 0; i < this.students.length; i++) {
      var grad = new CceAspectGrade();
      grad.sectionId = this.selectedSection.id;
      grad.studentId = this.students[i].id;
      grad.aspectId = this.selectedAspect.id;
      grad.term = this.term;
      grad.grade = '';
      this.grades.push(grad); 
    }

    this.aspectGradeService
      .getGrades(this.selectedAspect.id, this.selectedSection.id, this.term)
      .then(existingGrades => {
        this.existingGrades = existingGrades;
        if (this.existingGrades.length == 0) {
          this.isGradePresent = false;
        } else {
          this.isGradePresent = true;
          this.exportGrades();
        }
      })
      .catch(error => this.error = error);
  }

  exportGrades() {
    for (var i = 0; i < this.grades.length; i++) {
      for (var j = 0; j < this.existingGrades.length; j++) {
        if (this.existingGrades[j].studentId == this.grades[i].studentId) {
          this.grades[i].id = this.existingGrades[j].id;
          this.grades[i].grade = this.existingGrades[j].grade;
          this.grades[i].description = this.existingGrades[i].description;
        }
      }
    }
  }

  save() {
    this.defaultGrades();
    if (this.isGradePresent) {
      this.aspectGradeService
        .put(this.grades)
        .then()
        .catch(error => this.error = error)
    } else {
      this.aspectGradeService
        .post(this.grades)
        .then()
        .catch(error => this.error = error)
    }
  }

  defaultGrades() {
    for (var i = 0; i < this.grades.length; i++) {
      if (typeof this.grades[i].grade == 'undefined') {
        this.grades[i].grade = "";
      }
      if(typeof this.grades[i].description == 'undefined') {
        this.grades[i].description = "";
      }
    }
  }

}