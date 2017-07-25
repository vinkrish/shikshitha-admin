import { Routes } from '@angular/router';

import { ActivityComponent } from './activity/activity.component';
import { ActivityScoreComponent } from './activity-score/activity-score.component';
import { ExamSubjectGroupComponent } from './exam-subject-group/exam-subject-group.component'
import { ExamSubjectComponent } from './exam-subject/exam-subject.component';
import { GradeClassWiseComponent } from './grade-class-wise/grade-class-wise.component';
import { MarkComponent } from './mark/mark.component';
import { SliptestScoreComponent } from './sliptest-score/sliptest-score.component';
import { SubActivityComponent } from './subactivity/subactivity.component';
import { SubActivityScoreComponent } from './subactivity-score/subactivity-score.component';
import { examRoutes } from './exam/exam.routes';
import { sliptestRoutes } from './sliptest/sliptest.routes';

import { LoggedInGuard } from '../authentication/logged-in.guard';

export const ScholasticRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'activity',
      component: ActivityComponent,
      data: {
        heading: 'activity'
      },
      canActivate: [LoggedInGuard]
    }, {
      path: 'activity-score',
      component: ActivityScoreComponent,
      data: {
        heading: 'Activity Score'
      },
      canActivate: [LoggedInGuard]
    },
    ...examRoutes,
    {
      path: 'exam-subject-group',
      component: ExamSubjectGroupComponent,
      data: {
        heading: 'Exam Subject Group'
      },
      canActivate: [LoggedInGuard]
    }, {
      path: 'exam-subject',
      component: ExamSubjectComponent,
      data: {
        heading: 'Exam Subject'
      },
      canActivate: [LoggedInGuard]
    }, {
      path: 'grade-class-wise',
      component: GradeClassWiseComponent,
      data: {
        heading: 'Grade Class Wise'
      },
      canActivate: [LoggedInGuard]
    }, {
      path: 'mark',
      component: MarkComponent,
      data: {
        heading: 'Marks'
      },
      canActivate: [LoggedInGuard]
    },
    ...sliptestRoutes,
    {
      path: 'sliptest-score',
      component: SliptestScoreComponent,
      data: {
        heading: 'Sliptest Score'
      },
      canActivate: [LoggedInGuard]
    }, {
      path: 'subactivity',
      component: SubActivityComponent,
      data: {
        heading: 'Sub-Activity'
      },
      canActivate: [LoggedInGuard]
    }, {
      path: 'subactivity-score',
      component: SubActivityScoreComponent,
      data: {
        heading: 'Sub-Activity Score'
      },
      canActivate: [LoggedInGuard]
    }
  ]
  }
];
