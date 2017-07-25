import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }  from '@angular/router';
import { Portion }         from './portion';
import { PortionService }  from './portion.service';
import { CookieService }   from 'angular2-cookie/core';

@Component({
  selector: 'ui-portion-detail',
  templateUrl: './portion-edit.component.html',
  styleUrls: ['./portion-edit.component.css']
})

export class PortionEditComponent implements OnInit, OnDestroy {
  portion: Portion;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false;
  className: string = this.cookieService.get("className");
  classId: number = +this.cookieService.get("classId");
  subjectName: string = this.cookieService.get("subjectName");
  subjectId: number = +this.cookieService.get("subjectId");

  constructor(
    private route: ActivatedRoute,
    private cookieService:CookieService,
    private portionService: PortionService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let portionId = +params['id'];
        this.navigated = true;
        this.portionService.getPortion(this.classId, this.subjectId, portionId)
            .then(portion => {
              this.portion = portion;
            });
      } else {
        this.navigated = false;
        this.portion = new Portion();
        this.portion.classId = this.classId;
        this.portion.subjectId = this.subjectId;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.portionService
        .save(this.portion)
        .then(portion => {
          this.portion = portion;
          this.goBack(portion);
        })
        .catch(error => this.error = error);
  }

  goBack(savedPortion: Portion = null) {
    this.close.emit(savedPortion);
    if (this.navigated) { window.history.back(); }
  }

}