import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }        from '@angular/router';
import { CceTopicPrimary }       from './cce-topic-primary';
import { TopicPrimaryService }   from './cce-topic-primary.service';
import { CookieService }         from 'angular2-cookie/core';

@Component({
  selector: 'ui-cce-topic-primary-detail',
  templateUrl: './cce-topic-primary-edit.component.html',
  styleUrls: ['./cce-topic-primary-edit.component.css']
})

export class TopicPrimaryEditComponent implements OnInit, OnDestroy {
  topicPrimary: CceTopicPrimary;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false;
  coscholasticName: string = this.cookieService.get("coscholasticName");
  coscholasticId: number = +this.cookieService.get("coscholasticId");
  sectionHeadingName: string = this.cookieService.get("sectionHeadingName");
  sectionHeadingId: number = +this.cookieService.get("sectionHeadingId");

  constructor(
    private route: ActivatedRoute,
    private cookieService:CookieService,
    private topicPrimaryService: TopicPrimaryService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let topicPrimaryId = +params['id'];
        this.navigated = true;
        this.topicPrimaryService.getTopicPrimary(this.coscholasticId, topicPrimaryId)
            .then(sectionHeading => {
              this.topicPrimary = sectionHeading;
              this.topicPrimary.sectionHeadingId= this.sectionHeadingId;
            });
      } else {
        this.navigated = false;
        this.topicPrimary = new CceTopicPrimary();
        this.topicPrimary.sectionHeadingId = this.sectionHeadingId;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.topicPrimaryService
        .save(this.topicPrimary)
        .then(topicPrimary => {
          this.topicPrimary = topicPrimary;
          this.goBack(topicPrimary);
        })
        .catch(error => this.error = error);
  }

  goBack(savedTopicPrimary: CceTopicPrimary = null) {
    this.close.emit(savedTopicPrimary);
    if (this.navigated) { window.history.back(); }
  }

}