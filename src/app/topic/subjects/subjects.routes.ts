import { Routes }                   from '@angular/router';
import { SubjectsComponent }        from './subjects.component';
import { SubjectsEditComponent }    from './subjects-edit.component';
import { LoggedInGuard }            from '../../authentication/logged-in.guard';

export const subjectsRoutes: Routes = [
  {
    path: 'subjects',
    component: SubjectsComponent,
    data: {
        heading: 'Subjects'
    },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'subject/edit/:id',
    component: SubjectsEditComponent,
    data: {
        heading: 'Subejct Edit'
    },
    canActivate: [LoggedInGuard]
  }
];
