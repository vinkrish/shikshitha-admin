import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeeTransaction } from './fee-transaction';
import { FeeTransactionService }   from './fee-transaction.service';

@Component({
  selector: 'ui-fee-transaction-detail',
  templateUrl: './fee-transaction-edit.component.html',
  styleUrls: ['./fee-transaction-edit.component.css']
})

export class FeeTransactionEditComponent implements OnInit, OnDestroy {
  feeTransaction: FeeTransaction;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false;

  constructor(
    private feeService: FeeTransactionService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.navigated = false;
      this.feeTransaction = new FeeTransaction();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.feeService
      .save(this.feeTransaction)
      .then(feeTransaction => {
        this.feeTransaction = feeTransaction;
        this.goBack(feeTransaction);
      })
      .catch(error => this.error = error);
  }

  goBack(savedFee: FeeTransaction = this.feeTransaction) {
    this.close.emit(savedFee);
    if (this.navigated) { window.history.back(); }
  }

}