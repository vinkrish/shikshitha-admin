import { Component, OnInit }     from '@angular/core';
import { Router }                from '@angular/router';
import { CceCoscholastic }       from '../cce-coscholastic/cce-coscholastic';
import { CceSectionHeading }     from '../cce-section-heading/cce-section-heading';
import { CceTopicPrimary }		   from '../cce-topic-primary/cce-topic-primary';
import { CceAspectPrimary }      from './cce-aspect-primary';
import { CceCoscholasticService }from '../cce-coscholastic/cce-coscholastic.service';
import { SectionHeadingService } from '../cce-section-heading/cce-section-heading.service';
import { TopicPrimaryService }   from '../cce-topic-primary/cce-topic-primary.service';
import { AspectPrimaryService }  from './cce-aspect-primary.service';

@Component({
  selector: 'ui-cce-aspect-primary',
  templateUrl: './cce-aspect-primary.component.html',
  styleUrls: ['./cce-aspect-primary.component.css']
})

export class AspectPrimaryComponent implements OnInit {
  coscholastics: CceCoscholastic[];
  selectedCosch: CceCoscholastic;
  sectionHeadings: CceSectionHeading[];
  selectedSectionHeading: CceSectionHeading;
  topicPrimarys: CceTopicPrimary[];
  selectedTopicPrimary: CceTopicPrimary;
  aspectPrimary: CceAspectPrimary;
  aspects: CceAspectPrimary[];
  selectedAspect: CceAspectPrimary;
  addingAspect = false;
  error: any;

  constructor(
    private router: Router,
    private coschService: CceCoscholasticService,
    private sectionHeadingService: SectionHeadingService,
    private topicPrimaryService: TopicPrimaryService,
    private aspectPrimaryService: AspectPrimaryService) { }

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
    this.aspects = null;
    this.getSectionHeadings(this.selectedCosch.id);
    this.selectedSectionHeading = new CceSectionHeading();
    this.selectedTopicPrimary = new CceTopicPrimary();
    this.addingAspect = false;
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
    this.aspects = null;
    this.selectedTopicPrimary = new CceTopicPrimary();
    this.getTopicPrimarys(this.selectedSectionHeading.id);
    this.addingAspect = false;
  }

  getTopicPrimarys(id: number) {
    this.topicPrimaryService
      .getTopicPrimarys(id)
      .then(topicPrimarys => this.topicPrimarys = topicPrimarys)
      .catch(error => this.error = error);
  }

  topicSelected(selectedTopicPrimary) {
    this.selectedTopicPrimary = selectedTopicPrimary;
    this.aspects = null;
    this.getAspects(this.selectedTopicPrimary.id);
    this.addingAspect = false;
  }

  getAspects(id: number) {
    this.aspectPrimaryService
      .getAspectPrimarys(id)
      .then(aspectPrimarys => this.aspects = aspectPrimarys)
      .catch(error => this.error = error);
  }

  onSelect(aspect: CceAspectPrimary) {
    this.selectedAspect = aspect;
    this.addingAspect = false;
  }

  close(savedAspect: CceAspectPrimary) {
    this.addingAspect = false;
    //if (savedAspect) { this.getTopicPrimarys(this.selectedSectionHeading.id); }
  }

  add() {
    if (this.selectedCosch.id !== undefined && this.selectedSectionHeading.id !== undefined &&
        this.selectedTopicPrimary.id !== undefined) {
          this.aspectPrimary = new CceAspectPrimary();
          this.aspectPrimary.topicId = this.selectedTopicPrimary.id;
          this.addingAspect = true;
    }
    this.selectedAspect = null;
  }

  deleteAspect(aspect: CceAspectPrimary, event: any) {
    event.stopPropagation();
    this.aspectPrimaryService
      .delete(aspect)
      .then(res => {
        this.aspects = this.aspects.filter(h => h !== aspect);
        if (this.selectedAspect === aspect) { this.selectedAspect = null; }
      })
      .catch(error => this.error = error);
  }

  save() {
    this.aspectPrimaryService
        .save(this.aspectPrimary)
        .then(aspectPrimary => {
          this.addingAspect = false;
          this.aspects = null;
           this.getAspects(this.selectedTopicPrimary.id);
        })
        .catch(error => this.error = error);
  }

  update(aspect: CceAspectPrimary, event: any){
    event.stopPropagation();
    this.aspectPrimaryService
      .save(aspect)
      .then(() => this.getTopicPrimarys(this.selectedSectionHeading.id))
      .catch(error => this.error = error);
  }

}