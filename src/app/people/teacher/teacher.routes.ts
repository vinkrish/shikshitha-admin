import { Routes }                  from '@angular/router';
import { TeacherComponent }        from './teacher.component';
import { TeacherEditComponent }    from './teacher-edit.component';
import { LoggedInGuard }           from '../../authentication/logged-in.guard';

export const teacherRoutes: Routes = [
  {
    path: 'teacher',
    component: TeacherComponent,
    data: {
        heading: 'Teacher'
    },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'teacher/edit/:id',
    component: TeacherEditComponent,
    data: {
        heading: 'Teacher Edit'
    },
    canActivate: [LoggedInGuard]
  }
];
