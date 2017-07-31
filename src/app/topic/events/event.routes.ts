import { Routes }                   from '@angular/router';
import { EventComponent }           from './event.component';
import { EventEditComponent }       from './event-edit.component';
import { LoggedInGuard }            from '../../authentication/logged-in.guard';

export const eventRoutes: Routes = [
  {
    path: 'events',
    component: EventComponent,
    data: {
        heading: 'Events'
    },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'events/edit/:id',
    component: EventEditComponent,
    data: {
        heading: 'Event Edit'
    },
    canActivate: [LoggedInGuard]
  }
];
