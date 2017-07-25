import { Routes }                      from '@angular/router';
import { SectionHeadingComponent } 	   from './cce-section-heading.component';
import { SectionHeadingEditComponent } from './cce-section-heading-edit.component';
import { LoggedInGuard }               from '../../authentication/logged-in.guard';

export const sectionHeadingRoutes: Routes = [
    {
    path: 'cce-section-heading',
    component: SectionHeadingComponent,
    data: {
        heading: 'Section Heading'
    },
    canActivate: [LoggedInGuard]
  },
    {
    path: 'cce-section-heading/edit/:id',
    component: SectionHeadingEditComponent,
    data: {
        heading: 'Section Heading'
    },
    canActivate: [LoggedInGuard]
  }
];
