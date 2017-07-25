import { Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'signin',
      component: SigninComponent
    }]
  }
];
