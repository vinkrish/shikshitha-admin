import { Component, OnInit }              from '@angular/core';
import { Router }                         from '@angular/router';
import { Event }                          from '../../topic/events/event';
import { EventService }                   from '../../topic/events/event.service';
import { ClassEvent }                     from './class-event'
import { ClassEventService }              from './class-event.service';
import { CookieService }                  from 'angular2-cookie/core';

@Component({
  selector: 'ui-class-event',
  templateUrl: './class-event.component.html',
  styleUrls: ['./class-event.component.css']
})

export class ClassEventComponent implements OnInit {
  events: Event[];
  selectedEvent: Event;
  classEvents: ClassEvent[];
  selectedCE: ClassEvent;
  addingCE = false;
  error: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private eventService: EventService,
    private ceService: ClassEventService) { }

  ngOnInit() {
    this.getEvents();
    this.selectedEvent = new Event();
  }

  getEvents() {
    this.eventService
      .getEvents()
      .then(events => this.events = events)
      .catch(error => this.error = error);
    }

  eventSelected(selectedEvent) {
    this.selectedEvent = selectedEvent;
    this.getClassEvents(this.selectedEvent.id);
    this.cookieService.put("eventId", "" + this.selectedEvent.id);
    this.cookieService.put("eventTitle", this.selectedEvent.eventTitle);
    this.addingCE = false;
  }

  getClassEvents(id: number) {
    this.ceService
      .getClassEvents(id)
      .then(classEvents => this.classEvents = classEvents)
      .catch(error => this.error = error);
  }

  onSelect(classEvent: ClassEvent) {
    this.selectedCE = classEvent;
    this.addingCE = false;
  }

  close(savedSE: ClassEvent) {
    this.addingCE = false;
    if (savedSE) { this.getClassEvents(this.selectedEvent.id); }
  }

  addCE() {
    if(this.selectedEvent.id !== undefined) {
      this.addingCE = true;
    }
    this.selectedCE = null;
  }

  deleteCE(csg: ClassEvent, event: any) {
    event.stopPropagation();
    this.ceService
      .delete(csg)
      .then(res => {
        this.classEvents = this.classEvents.filter(h => h !== csg);
        if (this.selectedCE === csg) { this.selectedCE = null; }
      })
      .catch(error => this.error = error);
  }

}