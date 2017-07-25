import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }             from '@angular/router';
import { Clas }                       from '../../classroom/class/clas';
import { ClassService }               from '../../classroom/class/class.service';
import { CceCoscholasticClass }       from './cce-coscholastic-class';
import { CceCoschClassService }       from './cce-coscholastic-class.service';
import { CookieService }              from 'angular2-cookie/core';

@Component({
  selector: 'ui-ccc-detail',
  templateUrl: './cce-coscholastic-class-edit.component.html',
  styleUrls: ['./cce-coscholastic-class-edit.component.css']
})

export class CceCoschClassEditComponent implements OnInit, OnDestroy {
  classes: Clas[];
  cceCoschClass: CceCoscholasticClass;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false;
  coScholasticId: number = +this.cookieService.get("coScholasticId");
  coScholasticName: string = this.cookieService.get("coScholasticName");

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private cccService: CceCoschClassService,
    private classService: ClassService) {
  }

  ngOnInit() {
    this.getClasses();
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] === undefined) {
        this.navigated = false;
        this.cceCoschClass = new CceCoscholasticClass();
        this.cceCoschClass.coscholasticId = this.coScholasticId;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getClasses() {
    this.classService
      .getClasses()
      .then(classes => this.classes = classes)
      .catch(error => this.error = error);
    }

    classSelected(subjectId) {
      for (var i = 0; i < this.classes.length; i++) {
        if (this.classes[i].id == subjectId) {
          this.cceCoschClass.className = this.classes[i].className;
        }
      }
    }

  save() {
    this.cccService
      .save(this.cceCoschClass)
      .then(cceCoschClass => {
        this.cceCoschClass = cceCoschClass;
        this.goBack(cceCoschClass);
      })
      .catch(error => this.error = error);
  }

  goBack(savedSection: CceCoscholasticClass = null) {
    this.close.emit(savedSection);
    if (this.navigated) { window.history.back(); }
  }
  
}