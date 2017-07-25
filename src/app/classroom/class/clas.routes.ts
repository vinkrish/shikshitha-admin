import { Routes }                from '@angular/router';
import { ClassComponent }        from './class.component';
import { ClassEditComponent }    from './class-edit.component';
import { LoggedInGuard }         from '../../authentication/logged-in.guard';

export const clasRoutes: Routes = [
  {
    path: 'class',
    component: ClassComponent,
    data: {
        heading: 'Class'
    },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'class/edit/:id',
    component: ClassEditComponent,
    data: {
        heading: 'Class Edit'
    },
    canActivate: [LoggedInGuard]
  }
];