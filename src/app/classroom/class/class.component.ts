import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Clas } from './clas';
import { ClassService } from './class.service';

@Component({
  selector: 'ui-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})

export class ClassComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  classes: Clas[];
  selectedClass: Clas;
  addingClass = false;
  error: any;

  constructor(
	private router: Router,
	private classService: ClassService) { }

  ngOnInit() {
	this.getClasses();
  }

  getClasses() {
	this.classService
	  .getClasses()
	  .then(classes => this.classes = classes)
	  .catch(error => this.error = error);
  }

  onSelect(clas: Clas) {
	this.selectedClass = clas;
	this.addingClass = false;
  }

  close(savedClass: Clas) {
	this.addingClass = false;
	if (savedClass) { this.getClasses(); }
  }

  addClass() {
	this.addingClass = true;
	this.selectedClass = null;
	//this.scrollToBottom();
  }

  gotoEdit(clas: Clas, event: any) {
	event.stopPropagation();
	this.router.navigate(['classroom/class/edit', clas.id]);
  }

  deleteClass(clas: Clas, event: any) {
	event.stopPropagation();
	this.classService
	  .delete(clas)
	  .then(res => {
		this.classes = this.classes.filter(h => h !== clas);
		if (this.selectedClass === clas) { this.selectedClass = null; }
	  })
	  .catch(error => this.error = error);
  }

   scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    }

}