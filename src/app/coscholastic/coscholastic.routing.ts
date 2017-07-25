import { Routes } from '@angular/router';

import { AspectGradeComponent } from './cce-aspect-grade/cce-aspect-grade.component';
import { AspectPrimaryComponent } from './cce-aspect-primary/cce-aspect-primary.component';
import { CceCoschClassComponent } from './cce-coscholastic-class/cce-coscholastic-class.component';
import { CceStudentProfileComponent } from './cce-student-profile/cce-student-profile.component';
import { TopicGradeComponent } from './cce-topic-grade/cce-topic-grade.component';
import { TopicPrimaryComponent } from './cce-topic-primary/cce-topic-primary.component';
import { cceCoscholasticRoutes } from './cce-coscholastic/cce-coscholastic.routes';
import { sectionHeadingRoutes } from './cce-section-heading/cce-section-heading.routes';
import { topicPrimaryRoutes } from './cce-topic-primary/cce-topic-primary.routes';
import { LoggedInGuard } from '../authentication/logged-in.guard';

export const CoscholasticRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'cce-aspect-grade',
      component: AspectGradeComponent,
      data: {
        heading: 'Aspect Grade'
      },
      canActivate: [LoggedInGuard]
    }, {
      path: 'cce-aspect-primary',
      component: AspectPrimaryComponent,
      data: {
        heading: 'Aspect Primary'
      },
      canActivate: [LoggedInGuard]
    },
    ...cceCoscholasticRoutes,
    {
      path: 'cce-coscholastic-class',
      component: CceCoschClassComponent,
      data: {
        heading: 'Coscholastic Class'
      },
      canActivate: [LoggedInGuard]
    },
    ...sectionHeadingRoutes,
    {
      path: 'cce-student-profile',
      component: CceStudentProfileComponent,
      data: {
        heading: 'Student Profile'
      },
      canActivate: [LoggedInGuard]
    },{
      path: 'cce-topic-grade',
      component: TopicGradeComponent,
      data: {
        heading: 'Topic Grade'
      },
      canActivate: [LoggedInGuard]
    },
    ...topicPrimaryRoutes
    ]
  }
];
