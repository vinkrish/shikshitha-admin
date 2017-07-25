import { Routes }         		          from '@angular/router';
import { SubjectGroupComponent } 		    from './subject-group.component';
import { SubjectGroupEditComponent } 	  from './subject-group-edit.component';
import { LoggedInGuard }                from '../../authentication/logged-in.guard';

export const subjectGroupRoutes: Routes = [
  {
    path: 'subject-group',
    component: SubjectGroupComponent,
    data: {
        heading: 'Subject Group'
    },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'subject-group/edit/:id',
    component: SubjectGroupEditComponent,
    data: {
        heading: 'Subject Group Edit'
    },
    canActivate: [LoggedInGuard]
  }
];
