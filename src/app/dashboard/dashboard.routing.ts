import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { LoggedInGuard } from '../authentication/logged-in.guard';

export const DashboardRoutes: Routes = [{
  path: '',
  component: DashboardComponent,
  data: {
    heading: 'Dashboard'
  },
  canActivate: [LoggedInGuard]
}];
