import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { Event }              from './event';
import { EventService }       from './event.service';
import { DatePipe }           from '@angular/common';

@Component({
  selector: 'ui-event-detail',
  templateUrl: './event-edit.component.html'
})

export class EventEditComponent implements OnInit, OnDestroy {
  event: Event;
  events: Event[];
  today: number = Date.now();
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false;

  constructor(
    private datePipe: DatePipe,
    private eventService: EventService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.eventService.getEvents()
          .then(events => {
            this.events = events;
            this.event = this.events.find(sub => sub.id === id);
          })
      } else {
        //let time = new Date();
        //console.log(time.getTime());
        this.navigated = false;
        this.event = new Event();
        this.event.parentEventId = 0;
        this.event.createdBy = "admin";
        this.event.createdDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.eventService.getEvents()
          .then(events => {
            this.events = events;
          })
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  startTimeSet(time) {
    var e = new String().concat(this.event.startDate).concat("T").concat(time).concat(":00");
    //console.log(new Date(e));
    //console.log(new Date(e).getTime()/1000);
    this.event.startTime = new Date(e).getTime() / 1000;
  }

  save() {
    this.eventService
      .save(this.event)
      .then(event => {
        this.event = event;
        this.goBack(event);
      })
      .catch(error => this.error = error);
  }

  goBack(savedEvent: Event = null) {
    this.close.emit(savedEvent);
    if (this.navigated) { window.history.back(); }
  }

}