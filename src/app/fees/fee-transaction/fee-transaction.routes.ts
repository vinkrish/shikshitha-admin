import { Routes }                from '@angular/router';
import { FeeTransactionComponent } from './fee-transaction.component';
import { FeeTransactionEditComponent } from './fee-transaction-edit.component';
import { LoggedInGuard }         from '../../authentication/logged-in.guard';

export const feeTransactionRoutes: Routes = [
  {
    path: 'fee-transaction',
    component: FeeTransactionComponent,
    data: {
        heading: 'Student Payment'
    },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'fee-transaction/edit/:id',
    component: FeeTransactionEditComponent,
    data: {
        heading: 'Payment Details'
    },
    canActivate: [LoggedInGuard]
  }
];