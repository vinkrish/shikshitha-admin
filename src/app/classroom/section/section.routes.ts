import { Routes }         from '@angular/router';
import { SectionComponent } 	from './section.component';
import { SectionEditComponent } from './section-edit.component';
import { LoggedInGuard }        from '../../authentication/logged-in.guard';

export const sectionRoutes: Routes = [
    {
    path: 'section',
    component: SectionComponent,
    data: {
        heading: 'Section'
    },
    canActivate: [LoggedInGuard]
  },
    {
    path: 'section/edit/:id',
    component: SectionEditComponent,
    data: {
        heading: 'Section Edit'
    },
    canActivate: [LoggedInGuard]
  }
];
