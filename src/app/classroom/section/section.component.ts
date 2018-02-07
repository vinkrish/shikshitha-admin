import { Component, OnInit }     from '@angular/core';
import { Location }              from '@angular/common';
import { Router }                from '@angular/router';
import { Clas }                  from '../class/clas';
import { Section }			         from './section';
import { SectionService }		     from './section.service';
import { ClassService }          from '../class/class.service';
import { CookieService }         from 'angular2-cookie/core';

@Component({
  selector: 'ui-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})

export class SectionComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  sections: Section[];
  selectedSection: Section;
  addingSection = false;
  error: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private classService: ClassService,
    private sectionService: SectionService,
    private location: Location) { 
  }

  ngOnInit() {
    //this.location.subscribe(x => console.log(x));
    this.selectedClass = new Clas();
    this.getClasses();
  }

  getClasses() {
    this.classService
      .getClasses()
      .then(classes => { 
        this.classes = classes;
        this.selectedClass.id = +this.cookieService.get("classId");
        this.clasSelected(this.selectedClass.id);
      })
      .catch(error => this.error = error);
    }

  classSelected(selectedClass) {
    this.selectedSection = new Section();
    this.sections = [];
    this.selectedClass = selectedClass;
    this.getSections(this.selectedClass.id);
    this.cookieService.put("classId", "" + this.selectedClass.id);
    this.cookieService.put("className", this.selectedClass.className);
    this.addingSection = false;
  }

  clasSelected(classId) {
    this.selectedSection = new Section();
    this.sections = [];
    for (var i = 0; i < this.classes.length; i++) {
      if (this.classes[i].id == classId) {
        this.selectedClass.id = classId;
        this.selectedClass.className = this.classes[i].className;
        this.selectedClass.schoolId = this.classes[i].schoolId;
        this.selectedClass.attendanceType = this.classes[i].attendanceType;
        this.selectedClass.teacherId = this.classes[i].teacherId;
        break;
      }
    }
    this.getSections(this.selectedClass.id);
    this.cookieService.put("classId", "" + this.selectedClass.id);
    this.cookieService.put("className", this.selectedClass.className);
    this.addingSection = false;
  }

  getSections(id: number) {
    this.sectionService
      .getSections(id)
      .then(sections => this.sections = sections)
      .catch(error => this.error = error);
  }

  onSelect(section: Section) {
    this.selectedSection = section;
    this.addingSection = false;
  }

  close(savedSection: Section) {
    this.addingSection = false;
    if (savedSection) { this.getSections(this.selectedClass.id); }
  }

  addSection() {
    if(this.selectedClass.className !== "") {
      this.addingSection = true;
    }
    this.selectedSection = null;
  }

  gotoEdit(section: Section, event: any) {
    event.stopPropagation();
    this.router.navigate(['classroom/section/edit', section.id]);
  }

  deleteSection(section: Section, event: any) {
    event.stopPropagation();
    this.sectionService
      .delete(section)
      .then(res => {
        this.sections = this.sections.filter(h => h !== section);
        if (this.selectedSection === section) { this.selectedSection = null; }
      })
      .catch(error => this.error = error);
  }

}