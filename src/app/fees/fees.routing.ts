import { Routes } from '@angular/router';

import { FeeClassComponent } from './fee-class/fee-class.component';
import { FeeStudentComponent } from './fee-student/fee-student.component';
import { feeTransactionRoutes } from './fee-transaction/fee-transaction.routes';
import { LoggedInGuard } from '../authentication/logged-in.guard';

export const FeesRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'fee-class',
      component: FeeClassComponent,
      data: {
        heading: 'Class Fee'
      },
      canActivate: [LoggedInGuard]
    },{
      path: 'fee-student',
      component: FeeStudentComponent,
      data: {
        heading: 'Student Fee'
      },
      canActivate: [LoggedInGuard]
    },
    ...feeTransactionRoutes
    ]
  }
];
