import { Routes }                   from '@angular/router';
import { CceCoschComponent }        from './cce-coscholastic.component';
import { CceCoschEditComponent }    from './cce-coscholastic-edit.component';
import { LoggedInGuard }            from '../../authentication/logged-in.guard';

export const cceCoscholasticRoutes: Routes = [
  {
    path: 'cce-coscholastic',
    component: CceCoschComponent,
    canActivate: [LoggedInGuard],
    data: {
        heading: 'CCE Coscholastic'
      }
  },
  {
    path: 'cce-coscholastic/edit/:id',
    component: CceCoschEditComponent,
    canActivate: [LoggedInGuard],
    data: {
        heading: 'CCE Coscholastic'
      }
  }
];