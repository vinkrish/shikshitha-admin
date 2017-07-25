import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { School }				        from './school';
import { SchoolService }        from './school.service';
import { CookieService }		    from 'angular2-cookie/core';

@Component({
  selector: 'ui-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})

export class SchoolComponent implements OnInit {
  schools: School[];
  selectedSchool: School;
  addingSchool = false;
  superAdminPassword: string;
  error: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private schoolService: SchoolService) { 
  }

  ngOnInit() {
  }

  getSchools() {
    this.schoolService
      .getSchools(this.superAdminPassword)
      .then(schools => this.schools = schools)
      .catch(error => this.error = error);
  }

  onSelect(school: School) {
    this.selectedSchool = school;
    this.addingSchool = false;
  }

  close(savedSchool: School) {
    this.addingSchool = false;
    if (savedSchool) { this.getSchools(); }
  }
  
  add() {
    if (this.addingSchool) {
      this.addingSchool = false;
    } else {
      this.addingSchool = true;
    }
    this.selectedSchool = null;
  }

  gotoEdit(school: School, event: any) {
    event.stopPropagation();
    this.router.navigate(['superadmin/edit', school.id]);
  }

  delete(school: School, event: any) {
    event.stopPropagation();
    this.schoolService
      .delete(school)
      .then(res => {
        this.schools = this.schools.filter(h => h !== school);
        if (this.selectedSchool === school) { this.selectedSchool = null; }
      })
      .catch(error => this.error = error);
  }

}