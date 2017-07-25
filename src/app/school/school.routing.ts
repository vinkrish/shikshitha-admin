import { Routes }               from '@angular/router';
import { SchoolComponent }      from './school.component';
import { SchoolEditComponent }  from './school-edit.component';
import { LoggedInGuard }        from '../authentication/logged-in.guard';

export const schoolRoutes: Routes = [
   {
    path: '',
    component: SchoolComponent,
    data: {
      heading: 'School'
    },
    canActivate: [LoggedInGuard]
  },
   {
    path: 'edit/:id',
    component: SchoolEditComponent,
    data: {
      heading: 'School Edit'
    },
    canActivate: [LoggedInGuard]
  }
];
