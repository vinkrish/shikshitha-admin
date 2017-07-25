import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'classroom',
    loadChildren: './classroom/classroom.module#ClassroomModule'
  }, {
    path: 'topic',
    loadChildren: './topic/topic.module#TopicModule'
  }, {
    path: 'people',
    loadChildren: './people/people.module#PeopleModule'
  }, {
    path: 'scholastic',
    loadChildren: './scholastic/scholastic.module#ScholasticModule'
  }, {
    path: 'coscholastic',
    loadChildren: './coscholastic/coscholastic.module#CoscholasticModule'
  }, {
    path: 'superadmin',
    loadChildren: './school/school.module#SchoolModule'
  }]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  }]
}, {
  path: '**',
  redirectTo: 'error/404'
}];

