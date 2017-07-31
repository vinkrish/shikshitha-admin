import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from './event';
import { EventService } from './event.service';

@Component({
  selector: 'ui-event',
  templateUrl: './event.component.html'
})

export class EventComponent implements OnInit {
	events: Event[];
  	selectedEvent: Event;
  	addingEvent = false;
	error: any;

	constructor(
		private router: Router,
		private eventService: EventService) {
  	}

  ngOnInit() {
  	this.getEvents();
  }

  getEvents() {
	this.eventService
	  .getEvents()
	  .then(events => this.events = events)
	  .catch(error => this.error = error);
  }

  onSelect(event: Event) {
	this.selectedEvent = event;
	this.addingEvent = false;
  }

  close(savedEvent: Event) {
	console.log("class component close function");
	this.addingEvent = false;
	if (savedEvent) { this.getEvents(); }
  }

  addEvent() {
	this.addingEvent = true;
	this.selectedEvent = null;
  }

  gotoEdit(evnt: Event, event: any) {
	event.stopPropagation();
	this.router.navigate(['topic/events/edit', evnt.id]);
  }

  deleteEvent(evnt: Event, event: any) {
	event.stopPropagation();
	this.eventService
	  .delete(evnt)
	  .then(res => {
		this.events = this.events.filter(h => h !== evnt);
		if (this.selectedEvent === evnt) { this.selectedEvent = null; }
	  })
	  .catch(error => this.error = error);
  }

}