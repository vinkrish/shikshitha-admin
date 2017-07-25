import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CceCoscholastic } from './cce-coscholastic';
import { CceCoscholasticService } from './cce-coscholastic.service';

@Component({
  selector: 'ui-cce-coscholastic',
  templateUrl: './cce-coscholastic.component.html',
  styleUrls: ['./cce-coscholastic.component.css']
})

export class CceCoschComponent implements OnInit {
  cceCoschs: CceCoscholastic[];
  selectedCceCosch: CceCoscholastic;
  addingCceCosch = false;
  error: any;

  constructor(
	private router: Router,
	private cceCoschService: CceCoscholasticService) { }

  ngOnInit() {
	this.getCceCoschs();
  }

  getCceCoschs() {
	this.cceCoschService
	  .getCceCoscholastics()
	  .then(cceCoschs => this.cceCoschs = cceCoschs)
	  .catch(error => this.error = error);
  }

  onSelect(cceCosch: CceCoscholastic) {
	this.selectedCceCosch = cceCosch;
	this.addingCceCosch = false;
  }

  close(savedClass: CceCoscholastic) {
	this.addingCceCosch = false;
	if (savedClass) { this.getCceCoschs(); }
  }

  addCosch() {
	this.addingCceCosch = true;
	this.selectedCceCosch = null;
  }

  gotoEdit(cceCosch: CceCoscholastic, event: any) {
	event.stopPropagation();
	this.router.navigate(['coscholastic/cce-coscholastic/edit', cceCosch.id]);
  }

  deleteCosch(cceCosch: CceCoscholastic, event: any) {
	event.stopPropagation();
	this.cceCoschService
	  .delete(cceCosch)
	  .then(res => {
		this.cceCoschs = this.cceCoschs.filter(h => h !== cceCosch);
		if (this.selectedCceCosch === cceCosch) { this.selectedCceCosch = null; }
	  })
	  .catch(error => this.error = error);
  }

}