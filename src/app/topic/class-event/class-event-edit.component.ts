import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }           from '@angular/router';
import { Clas }                     from '../../classroom/class/clas';
import { ClassService }             from '../../classroom/class/class.service';
import { ClassEvent }               from './class-event'
import { ClassEventService }        from './class-event.service';
import { CookieService }            from 'angular2-cookie/core';

@Component({
  selector: 'ui-ce-detail',
  templateUrl: './class-event-edit.component.html',
  styleUrls: ['./class-event-edit.component.css']
})

export class ClassEventEditComponent implements OnInit, OnDestroy {
  classes: Clas[];
  classEvent: ClassEvent;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false;
  eventId: number = +this.cookieService.get("eventId");
  eventTitle: string = this.cookieService.get("eventTitle");

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private ceService: ClassEventService,
    private classService: ClassService) {
  }

  ngOnInit() {
    this.getClasses();
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] === undefined) {
        this.navigated = false;
        this.classEvent = new ClassEvent();
        this.classEvent.eventId = this.eventId;
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
        this.classEvent.classId = this.classes[i].id;
        this.classEvent.className = this.classes[i].className;
      }
    }
  }

  save() {
    this.ceService
      .save(this.classEvent)
      .then(classEvent => {
        this.classEvent = classEvent;
        this.goBack(classEvent);
      })
      .catch(error => this.error = error);
  }

  goBack(savedSection: ClassEvent = null) {
    this.close.emit(savedSection);
    if (this.navigated) { window.history.back(); }
  }

}