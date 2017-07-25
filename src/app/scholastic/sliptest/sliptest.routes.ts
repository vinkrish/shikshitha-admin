import { Routes }                   from '@angular/router';
import { SliptestComponent } 	    from './sliptest.component';
import { SliptestEditComponent }    from './sliptest-edit.component';
import { LoggedInGuard }            from '../../authentication/logged-in.guard';

export const sliptestRoutes: Routes = [
    {
        path: 'sliptest',
        component: SliptestComponent,
        data: {
            heading: 'Sliptest'
        },
        canActivate: [LoggedInGuard]
    },
    {
        path: 'sliptest/edit/:id',
        component: SliptestEditComponent,
        data: {
            heading: 'Sliptest Edit'
        },
        canActivate: [LoggedInGuard]
   } 
];
