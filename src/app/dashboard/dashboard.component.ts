import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  private instituitionName: string;

  constructor(private cookieService: CookieService) {
  }

  ngOnInit() {
    this.instituitionName = this.cookieService.get("schoolName");
  }

}
