import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FeeClass } from './fee-class';
import { FeeClassService } from './fee-class.service';

@Component({
  selector: 'ui-fee-class',
  templateUrl: './fee-class.component.html',
  styleUrls: ['./fee-class.component.css']
})

export class FeeClassComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  classes: FeeClass[];
  selectedClass: FeeClass;
  feeTypes: string[] =["yearly", "half-yearly", "quaterly", "monthly"];
  error: any;

  constructor(
	private router: Router,
	private feeClassService: FeeClassService) { }

  ngOnInit() {
	this.getClasses();
  }

  getClasses() {
	this.feeClassService
	  .getClasses()
	  .then(classes => this.classes = classes)
	  .catch(error => this.error = error);
  }

  onSelect(clas: FeeClass) {
	  this.selectedClass = clas;
  }

  update(feeClass: FeeClass, event: any) {
    event.stopPropagation();
    this.feeClassService
      .save(feeClass)
      .then(() => {;
      })
      .catch(error => this.error = error);
  }

   scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    }

}