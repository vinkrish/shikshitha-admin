import { Component, OnInit } 	from '@angular/core';
import { Router }            	from '@angular/router';
import { Clas }               from '../../classroom/class/clas';
import { ClassService }       from '../../classroom/class/class.service';
import { GradeClassWise }      from './grade-class-wise';
import { GradeClassWiseService }    from './grade-class-wise.service';

@Component({
	selector: 'ui-gcw-subject',
	templateUrl: './grade-class-wise.component.html',
	styleUrls: ['./grade-class-wise.component.css']
})

export class GradeClassWiseComponent implements OnInit {
  classes: Clas[];
  selectedClass: Clas;
  gradeClassWise: GradeClassWise;
  gradesClassWise: GradeClassWise[];
  selectedGCW: GradeClassWise;
  addingGCW = false;
  error: any;

  constructor(
    private router: Router,
    private classService: ClassService,
    private gcwService: GradeClassWiseService) { 
  }

  ngOnInit() {
    this.getClasses();
    this.selectedClass = new Clas();
  }

  getClasses() {
    this.classService
      .getClasses()
      .then(classes => this.classes = classes)
      .catch(error => this.error = error);
    }

  classSelected(selectedClass) {
    this.selectedClass = selectedClass;
    this.addingGCW = false;
    this.getGradesClassWise(this.selectedClass.id);
  }

  getGradesClassWise(id: number){
    this.gcwService
      .getGradesClassWise(id)
      .then(gradesClassWise => this.gradesClassWise = gradesClassWise)
      .catch(error => this.error = error)
  }

  onSelect(gradesClassWise: GradeClassWise) {
    this.selectedGCW = gradesClassWise;
    this.addingGCW = false;
  }

  close() {
    this.addingGCW = false;
  }

  add() {
    if(this.selectedClass.id !== undefined) {
      this.gradeClassWise = new GradeClassWise();
      this.gradeClassWise.classId = this.selectedClass.id;
      this.addingGCW = true;
    }
    this.selectedGCW = null;
  }

  delete(gradeClassWise: GradeClassWise, event: any) {
    event.stopPropagation();
    this.gcwService
      .delete(gradeClassWise)
      .then(res => {
        this.gradesClassWise = this.gradesClassWise.filter(h => h !== gradeClassWise);
        if (this.selectedGCW === gradeClassWise) { this.selectedGCW = null; }
      })
      .catch(error => this.error = error);
  }

  save() {
    this.gcwService
      .post(this.gradeClassWise)
      .then(gradeClassWise => {
        this.addingGCW = false;
        //this.selectedClass = new Clas();
        this.selectedGCW = new GradeClassWise();
        this.gradesClassWise = [];
        this.getGradesClassWise(this.selectedClass.id);
      })
      .catch(error => this.error = error);
  }

  update(gradeClassWise: GradeClassWise, event: any){
    event.stopPropagation();
    this.gcwService
      .save(gradeClassWise)
      .then(() => this.getGradesClassWise(this.selectedClass.id))
      .catch(error => this.error = error);
  }

}