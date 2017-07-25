import { Component, OnInit }     	from '@angular/core';
import { Router }                	from '@angular/router';
import { CceCoscholastic }				from '../cce-coscholastic/cce-coscholastic';
import { CceCoscholasticService }	from '../cce-coscholastic/cce-coscholastic.service';
import { CceCoscholasticClass }		from './cce-coscholastic-class';
import { CceCoschClassService }   from './cce-coscholastic-class.service';
import { CookieService }          from 'angular2-cookie/core';

@Component({
  selector: 'ui-cce-coscholastic-class',
  templateUrl: './cce-coscholastic-class.component.html',
  styleUrls:  ['./cce-coscholastic-class.component.css']
})

export class CceCoschClassComponent implements OnInit {
  	cceCoscholastics: CceCoscholastic[];
  	selectedCosch: CceCoscholastic;
	  cceCoschClasses: CceCoscholasticClass[];
	  selectedCCC: CceCoscholasticClass;
	  addingCCC = false;
	  error: any;

	constructor(
		private router: Router,
    private cookieService: CookieService,
    private coSchService: CceCoscholasticService,
		private cccService: CceCoschClassService) { }

  ngOnInit() {
      this.getCceCoscholastics();
      this.selectedCosch = new CceCoscholastic();
  }

  getCceCoscholastics() {
    this.coSchService
        .getCceCoscholastics()
        .then(cceCoscholastics => this.cceCoscholastics = cceCoscholastics)
        .catch(error => this.error = error);
    }

   coSchSelected(selectedCosch){
     this.selectedCosch = selectedCosch;
     this.getCceCoschClasses(this.selectedCosch.id);
     this.cookieService.put("coScholasticId", ""+this.selectedCosch.id);
     this.cookieService.put("coScholasticName", this.selectedCosch.name);
     this.addingCCC = false;
   }

	getCceCoschClasses(id: number) {
	    this.cccService
	        .getCceCoschClasses(id)
	        .then(cceCoschClasses => this.cceCoschClasses = cceCoschClasses)
	        .catch(error => this.error = error);
  	}

	onSelect(subjectGroupSubject: CceCoscholasticClass) {
    	this.selectedCCC = subjectGroupSubject;
    	this.addingCCC = false;
  	}

  	close(savedCCC: CceCoscholasticClass) {
  		this.addingCCC = false;
    	if (savedCCC) { this.getCceCoschClasses(this.selectedCosch.id); }
  	}

	addCceCoschClass() {
    if(this.selectedCosch.id !== undefined) {
      this.addingCCC = true;
    }
		this.selectedCCC = null;
	}

	deleteCceCoschClass(ccc: CceCoscholasticClass, event: any) {
    event.stopPropagation();
    this.cccService
        .delete(ccc)
        .then(res => {
          this.cceCoschClasses = this.cceCoschClasses.filter(h => h !== ccc);
          if (this.selectedCCC === ccc) { this.selectedCCC = null; }
        })
        .catch(error => this.error = error);
  }

}