import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }           from '@angular/router';
import { CceCoscholastic }          from './cce-coscholastic';
import { CceCoscholasticService }   from './cce-coscholastic.service';

@Component({
  selector: 'ui-cce-coscholastic-detail',
  templateUrl: './cce-coscholastic-edit.component.html',
  styleUrls: ['./cce-coscholastic-edit.component.css']
})

export class CceCoschEditComponent implements OnInit, OnDestroy {
  cceCosch: CceCoscholastic;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false;

  constructor(
    private coschService: CceCoscholasticService,
    private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.coschService.getCceCoscholastic(id)
          .then(cceCosch => this.cceCosch = cceCosch);
      } else {
        this.navigated = false;
        this.cceCosch = new CceCoscholastic();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.coschService
      .save(this.cceCosch)
      .then(cceCosch => {
        this.cceCosch = cceCosch;
        this.goBack(cceCosch);
      })
      .catch(error => this.error = error);
  }

  goBack(savedCceCosch: CceCoscholastic = null) {
    this.close.emit(savedCceCosch);
    if (this.navigated) { window.history.back(); }
  }

}