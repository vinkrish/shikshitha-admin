import { Routes }               from '@angular/router';
import { StudentComponent }     from './student.component';
import { StudentEditComponent } from './student-edit.component';
import { LoggedInGuard }        from '../../authentication/logged-in.guard';

export const studentRoutes: Routes = [
   {
    path: 'student',
    component: StudentComponent,
    data: {
        heading: 'Student'
    },
    canActivate: [LoggedInGuard]
  },
   {
    path: 'student/edit/:id',
    component: StudentEditComponent,
    data: {
        heading: 'Student Edit'
    },
    canActivate: [LoggedInGuard]
  }
];
