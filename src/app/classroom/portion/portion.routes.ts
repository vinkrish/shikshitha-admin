import { Routes }               from '@angular/router';
import { PortionComponent } 	from './portion.component';
import { PortionEditComponent } from './portion-edit.component';
import { LoggedInGuard }        from '../../authentication/logged-in.guard';

export const portionRoutes: Routes = [
    {
        path: 'portion',
        component: PortionComponent,
        data: {
            heading: 'Portion'
        },
        canActivate: [LoggedInGuard]
    },
    {
        path: 'portion/edit/:id',
        component: PortionEditComponent,
        data: {
            heading: 'Portion Edit'
        },
        canActivate: [LoggedInGuard]
   } 
];
