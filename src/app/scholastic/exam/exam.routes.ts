import { Routes }               from '@angular/router';
import { ExamComponent }        from './exam.component';
import { ExamEditComponent }    from './exam-edit.component';
import { LoggedInGuard }        from '../../authentication/logged-in.guard';

export const examRoutes: Routes = [
  {
    path: 'exam',
    component: ExamComponent,
    data: {
        heading: 'Exam'
    },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'exam/edit/:id',
    component: ExamEditComponent,
    data: {
        heading: 'Exam Edit'
    },
    canActivate: [LoggedInGuard]
  }
];