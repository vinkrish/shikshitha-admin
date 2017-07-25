import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }        from '@angular/router';
import { CceSectionHeading }     from './cce-section-heading';
import { SectionHeadingService } from './cce-section-heading.service';
import { CookieService }         from 'angular2-cookie/core';

@Component({
  selector: 'ui-cce-section-heading-detail',
  templateUrl: './cce-section-heading-edit.component.html',
  styleUrls: ['./cce-section-heading-edit.component.css']
})

export class SectionHeadingEditComponent implements OnInit, OnDestroy {
  sectionHeading: CceSectionHeading;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false;
  coscholasticName: string = this.cookieService.get("coscholasticName");
  coscholasticId: number = +this.cookieService.get("coscholasticId");

  constructor(
    private route: ActivatedRoute,
    private cookieService:CookieService,
    private sectionHeadingService: SectionHeadingService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let sectionHeadingId = +params['id'];
        this.navigated = true;
        this.sectionHeadingService.getSectionHeading(this.coscholasticId, sectionHeadingId)
            .then(sectionHeading => {
              this.sectionHeading = sectionHeading;
              this.sectionHeading.coscholasticId= this.coscholasticId;
            });
      } else {
        this.navigated = false;
        this.sectionHeading = new CceSectionHeading();
        this.sectionHeading.coscholasticId = this.coscholasticId;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.sectionHeadingService
        .save(this.sectionHeading)
        .then(sectionHeading => {
          this.sectionHeading = sectionHeading;
          this.goBack(sectionHeading);
        })
        .catch(error => this.error = error);
  }

  goBack(savedSectionHeading: CceSectionHeading = null) {
    this.close.emit(savedSectionHeading);
    if (this.navigated) { window.history.back(); }
  }

}