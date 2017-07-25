import { Component, OnInit }     from '@angular/core';
import { Router }                from '@angular/router';
import { CceCoscholastic }       from '../cce-coscholastic/cce-coscholastic';
import { CceSectionHeading }		 from './cce-section-heading';
import { SectionHeadingService } from './cce-section-heading.service';
import { CceCoscholasticService }from '../cce-coscholastic/cce-coscholastic.service';
import { CookieService }         from 'angular2-cookie/core';

@Component({
  selector: 'ui-cce-section-heading',
  templateUrl: './cce-section-heading.component.html',
  styleUrls: ['./cce-section-heading.component.css']
})

export class SectionHeadingComponent implements OnInit {
  coscholastics: CceCoscholastic[];
  selectedCosch: CceCoscholastic;
  sectionHeadings: CceSectionHeading[];
  selectedSectionHeading: CceSectionHeading;
  addingSectionHeading = false;
  error: any;

  constructor(
    private router: Router,
    private _cookieService: CookieService,
    private coschService: CceCoscholasticService,
    private sectionHeadingService: SectionHeadingService) { }

  ngOnInit() {
    this.getCoscholastics();
    this.selectedCosch = new CceCoscholastic(0, "");
  }

  getCoscholastics() {
    this.coschService
      .getCceCoscholastics()
      .then(coscholastics => this.coscholastics = coscholastics)
      .catch(error => this.error = error);
    }

  coschSelected(selectedCosch) {
    this.selectedCosch = selectedCosch;
    this.getSectionHeadings(this.selectedCosch.id);
    this._cookieService.put("coscholasticId", "" + this.selectedCosch.id);
    this._cookieService.put("coscholasticName", this.selectedCosch.name);
    this.addingSectionHeading = false;
  }

  getSectionHeadings(id: number) {
    this.sectionHeadingService
      .getSectionHeadings(id)
      .then(sectionHeadings => this.sectionHeadings = sectionHeadings)
      .catch(error => this.error = error);
  }

  onSelect(sectionHeading: CceSectionHeading) {
    this.selectedSectionHeading = sectionHeading;
    this.addingSectionHeading = false;
  }

  close(savedSectionHeading: CceSectionHeading) {
    this.addingSectionHeading = false;
    if (savedSectionHeading) { this.getSectionHeadings(this.selectedCosch.id); }
  }

  addSectionHeading() {
    if(this.selectedCosch.id !== 0) {
      this.addingSectionHeading = true;
    }
    this.selectedSectionHeading = null;
  }

  gotoEdit(sectionHeading: CceSectionHeading, event: any) {
    event.stopPropagation();
    this.router.navigate(['coscholastic/cce-section-heading/edit', sectionHeading.id]);
  }

  deleteSectionHeading(section: CceSectionHeading, event: any) {
    event.stopPropagation();
    this.sectionHeadingService
      .delete(section)
      .then(res => {
        this.sectionHeadings = this.sectionHeadings.filter(h => h !== section);
        if (this.selectedSectionHeading === section) { this.selectedSectionHeading = null; }
      })
      .catch(error => this.error = error);
  }

}