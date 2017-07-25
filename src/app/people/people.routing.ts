import { Routes } from '@angular/router';

import { studentRoutes } from './student/student.routes';
import { teacherRoutes } from './teacher/teacher.routes';

export const PeopleRoutes: Routes = [
  {
    path: '',
    children: [
      ...studentRoutes,
      ...teacherRoutes
    ]
  }
];
