import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FeeTransaction } from './fee-transaction';
import { FeeTransactionService } from './fee-transaction.service';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'ui-fee-transaction',
  templateUrl: './fee-transaction.component.html',
  styleUrls: ['./fee-transaction.component.css']
})

export class FeeTransactionComponent implements OnChanges, OnInit {
  @Input() studentId: number;
  @Output() refreshClick: EventEmitter<String> = new EventEmitter<String>();
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  feeTransactions: FeeTransaction[];
  selectedFeeTransaction: FeeTransaction;
  studentName: string;
  addingFeeTransaction = false;
  error: any;

  constructor(
	private router: Router,
  private cookieService: CookieService,
	private feeService: FeeTransactionService) { }

  ngOnInit() {
    this.studentId = +this.cookieService.get("studentId");
    this.studentName = this.cookieService.get("studentName");
	  this.getClasses(this.studentId);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.studentId = +this.cookieService.get("studentId");
    this.studentName = this.cookieService.get("studentName");
    this.feeTransactions = [];
    this.getClasses(this.studentId);
    // changes.prop contains the old and the new value...
  }

  getClasses(studentId) {
	this.feeService
	  .getClasses(studentId)
	  .then(feeTransactions => this.feeTransactions = feeTransactions)
	  .catch(error => this.error = error);
  }

  onSelect(feeTransaction: FeeTransaction) {
	  this.selectedFeeTransaction = feeTransaction;
	  this.addingFeeTransaction = false;
  }

  close(savedClass: FeeTransaction) {
	  this.addingFeeTransaction = false;
	  if (savedClass) { this.getClasses(this.studentId); }
    this.refreshClick.emit();
  }

  addClass() {
	  this.addingFeeTransaction = true;
	  this.selectedFeeTransaction = null;
	//this.scrollToBottom();
  }

  delete(feeTransaction: FeeTransaction, event: any) {
	  event.stopPropagation();
  	this.feeService
  	  .delete(feeTransaction)
  	  .then(res => {
        this.refreshClick.emit();
  		  this.feeTransactions = this.feeTransactions.filter(h => h !== feeTransaction);
  		  if (this.selectedFeeTransaction === feeTransaction) { this.selectedFeeTransaction = null; }
  	  })
  	  .catch(error => this.error = error);
  }

   scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
    }

}