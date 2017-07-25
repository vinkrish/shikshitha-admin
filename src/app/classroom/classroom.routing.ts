import { Routes } from '@angular/router';

import { AttendanceComponent } from './attendance/attendance.component';
import { clasRoutes } from './class/clas.routes';
import { HomeworkComponent } from './homework/homework.component';
import { portionRoutes } from './portion/portion.routes';
import { sectionRoutes } from './section/section.routes';
import { TimetableComponent } from './timetable/timetable.component';
import { LoggedInGuard } from '../authentication/logged-in.guard';

export const ClassroomRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'attendance',
      component: AttendanceComponent,
      data: {
        heading: 'Attendance'
      },
      canActivate: [LoggedInGuard]
    },
    ...clasRoutes,
    {
      path: 'homework',
      component: HomeworkComponent,
      data: {
        heading: 'Homework'
      },
      canActivate: [LoggedInGuard]
    },
    ...portionRoutes,
    ...sectionRoutes,
    {
      path: 'timetable',
      component: TimetableComponent,
      data: {
        heading: 'Timetable'
      },
      canActivate: [LoggedInGuard]
    }]
  }
];
