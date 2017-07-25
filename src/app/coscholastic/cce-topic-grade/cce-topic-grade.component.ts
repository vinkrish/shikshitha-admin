import { Component, OnInit }     from '@angular/core';
import { Router }                from '@angular/router';
import { CceCoscholastic }       from '../cce-coscholastic/cce-coscholastic';
import { CceSectionHeading }     from '../cce-section-heading/cce-section-heading';
import { CceTopicPrimary }		   from '../cce-topic-primary/cce-topic-primary';
import { CceTopicGrade }         from './cce-topic-grade';
import { CceCoscholasticService }from '../cce-coscholastic/cce-coscholastic.service';
import { SectionHeadingService } from '../cce-section-heading/cce-section-heading.service';
import { TopicPrimaryService }   from '../cce-topic-primary/cce-topic-primary.service';
import { TopicGradeService }     from './cce-topic-grade.service';

@Component({
  selector: 'ui-cce-topic-grade',
  templateUrl: './cce-topic-grade.component.html',
  styleUrls: ['./cce-topic-grade.component.css']
})

export class TopicGradeComponent implements OnInit {
  coscholastics: CceCoscholastic[];
  selectedCosch: CceCoscholastic;
  sectionHeadings: CceSectionHeading[];
  selectedSectionHeading: CceSectionHeading;
  topicPrimarys: CceTopicPrimary[];
  selectedTopicPrimary: CceTopicPrimary;
  topicGrade: CceTopicGrade;
  topicGrades: CceTopicGrade[];
  selectedTopicGrade: CceTopicGrade;
  addingTopicGrade = false;
  error: any;

  constructor(
    private router: Router,
    private coschService: CceCoscholasticService,
    private sectionHeadingService: SectionHeadingService,
    private topicPrimaryService: TopicPrimaryService,
    private topicGradeService: TopicGradeService) { }

  ngOnInit() {
    this.getCoscholastics();
    this.selectedCosch = new CceCoscholastic();
    this.selectedSectionHeading = new CceSectionHeading();
    this.selectedTopicPrimary = new CceTopicPrimary();
  }

  getCoscholastics() {
    this.coschService
      .getCceCoscholastics()
      .then(coscholastics => this.coscholastics = coscholastics)
      .catch(error => this.error = error);
    }

  coschSelected(selectedCosch) {
    this.selectedCosch = selectedCosch;
    this.topicGrades = null;
    this.getSectionHeadings(this.selectedCosch.id);
    this.selectedSectionHeading = new CceSectionHeading();
    this.selectedTopicPrimary = new CceTopicPrimary();
    this.addingTopicGrade = false;
    //this.selectingSecHead = false;
    this.topicPrimarys = null;
  }

  getSectionHeadings(coscholasticId) {
    this.sectionHeadingService
      .getSectionHeadings(coscholasticId)
      .then(sectionHeadings => this.sectionHeadings = sectionHeadings)
      .catch(error => this.error = error);
  }

  sectionHeadingSelected(selectedSectionHeading) {
    this.selectedSectionHeading = selectedSectionHeading;
    this.topicGrades = null;
    this.selectedTopicPrimary = new CceTopicPrimary();
    this.getTopicPrimarys(this.selectedSectionHeading.id);
    this.addingTopicGrade = false;
  }

  getTopicPrimarys(id: number) {
    this.topicPrimaryService
      .getTopicPrimarys(id)
      .then(topicPrimarys => this.topicPrimarys = topicPrimarys)
      .catch(error => this.error = error);
  }

  topicSelected(selectedTopicPrimary) {
    this.selectedTopicPrimary = selectedTopicPrimary;
    this.topicGrades = null;
    this.getTopicGrades(this.selectedTopicPrimary.id);
    this.addingTopicGrade = false;
  }

  getTopicGrades(id: number) {
    this.topicGradeService
      .getTopicGrades(id)
      .then(aspectPrimarys => this.topicGrades = aspectPrimarys)
      .catch(error => this.error = error);
  }

  onSelect(topicGrade: CceTopicGrade) {
    this.selectedTopicGrade = topicGrade;
    this.addingTopicGrade = false;
  }

  close(savedTopicGrade: CceTopicGrade) {
    this.addingTopicGrade = false;
    //if (savedAspect) { this.getTopicPrimarys(this.selectedSectionHeading.id); }
  }

  add() {
    if (this.selectedCosch.id !== undefined && this.selectedSectionHeading.id !== undefined &&
        this.selectedTopicPrimary.id !== undefined) {
          this.topicGrade = new CceTopicGrade();
          this.topicGrade.topicId = this.selectedTopicPrimary.id;
          this.addingTopicGrade = true;
    }
    this.selectedTopicGrade = null;
  }

  delete(topicGrade: CceTopicGrade, event: any) {
    event.stopPropagation();
    this.topicGradeService
      .delete(topicGrade)
      .then(res => {
        this.topicGrades = this.topicGrades.filter(h => h !== topicGrade);
        if (this.selectedTopicGrade === topicGrade) { this.selectedTopicGrade = null; }
      })
      .catch(error => this.error = error);
  }

  save() {
    this.topicGradeService
        .save(this.topicGrade)
        .then(topicGrade => {
          this.addingTopicGrade = false;
          this.topicGrades = null;
           this.getTopicGrades(this.selectedTopicPrimary.id);
        })
        .catch(error => this.error = error);
  }

  update(topicGrade: CceTopicGrade, event: any){
    event.stopPropagation();
    this.topicGradeService
      .save(topicGrade)
      .then(() => this.getTopicPrimarys(this.selectedSectionHeading.id))
      .catch(error => this.error = error);
  }

}