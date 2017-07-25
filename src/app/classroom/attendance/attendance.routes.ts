import { Routes }         		from '@angular/router';
import { AttendanceComponent }	from './attendance.component';
import { LoggedInGuard }        from '../../authentication/logged-in.guard';

export const attendanceRoutes: Routes = [
  {
    path: 'attendance',
    component: AttendanceComponent,
    data: {
        heading: 'Attendance'
    },
    canActivate: [LoggedInGuard]
  }
];