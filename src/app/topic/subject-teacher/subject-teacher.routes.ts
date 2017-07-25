import { Routes }         		          from '@angular/router';
import { SubjectTeacherComponent } 		  from './subject-teacher.component';
import { SubjectTeacherEditComponent } 	from './subject-teacher-edit.component';
import { LoggedInGuard }                from '../../authentication/logged-in.guard';

export const subjectTeacherRoutes: Routes = [
  {
    path: 'subject-teacher',
    component: SubjectTeacherComponent,
    data: {
        heading: 'Subject Teacher'
    },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'subject-teacher/edit/:id',
    component: SubjectTeacherEditComponent,
    data: {
        heading: 'Subject Teacher Edit'
    },
    canActivate: [LoggedInGuard]
  }
];
