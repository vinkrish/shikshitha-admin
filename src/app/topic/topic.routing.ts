import { Routes } from '@angular/router';

import { ClassSubjectGroupComponent } from './class-subject-group/class-subject-group.component';
import { subjectGroupRoutes } from './subject-group/subject-group.routes'
import { SubjectGroupSubjectComponent } from './subject-group-subject/subject-group-subject.component'
import { SubjectStudentComponent } from './subject-student/subject-student.component';
import { ClassEventComponent } from './class-event/class-event.component';
import { subjectTeacherRoutes } from './subject-teacher/subject-teacher.routes';
import { subjectsRoutes } from './subjects/subjects.routes';
import { eventRoutes } from './events/event.routes';

import { LoggedInGuard } from '../authentication/logged-in.guard';

export const TopicRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'class-subject-group',
      component: ClassSubjectGroupComponent,
      data: {
        heading: 'Class Subject Group'
      },
      canActivate: [LoggedInGuard]
    },
    ...subjectGroupRoutes,
    {
      path: 'subject-group-subject',
      component: SubjectGroupSubjectComponent,
      data: {
        heading: 'Subject Group Subject'
      },
      canActivate: [LoggedInGuard]
    },
    {
      path: 'subject-student',
      component: SubjectStudentComponent,
      data: {
        heading: 'Subject Student'
      },
      canActivate: [LoggedInGuard]
    },
    ...subjectTeacherRoutes,
    ...subjectsRoutes,
    ...eventRoutes,
    {
      path: 'class-event',
      component: ClassEventComponent,
      data: {
        heading: 'Class Event'
      },
      canActivate: [LoggedInGuard]
    }]
  }
];
