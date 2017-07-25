import { Routes }                      from '@angular/router';
import { TopicPrimaryComponent } 	   from './cce-topic-primary.component';
import { TopicPrimaryEditComponent }   from './cce-topic-primary-edit.component';
import { LoggedInGuard }               from '../../authentication/logged-in.guard';

export const topicPrimaryRoutes: Routes = [
    {
    path: 'cce-topic-primary',
    component: TopicPrimaryComponent,
    data: {
        heading: 'Topic Primary'
    },
    canActivate: [LoggedInGuard]
  },
    {
    path: 'cce-topic-primary/edit/:id',
    component: TopicPrimaryEditComponent,
    data: {
        heading: 'Topic Primary'
    },
    canActivate: [LoggedInGuard]
  }
];
