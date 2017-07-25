import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/materialmodule.module';
import { ClassroomRoutes } from './classroom.routing';
import { AttendanceComponent } from './attendance/attendance.component';
import { ClassComponent } from './class/class.component';
import { ClassEditComponent } from './class/class-edit.component';
import { HomeworkComponent } from './homework/homework.component';
import { PortionComponent } from './portion/portion.component';
import { PortionEditComponent } from './portion/portion-edit.component';
import { SectionComponent } from './section/section.component';
import { SectionEditComponent } from './section/section-edit.component';
import { TimetableComponent } from './timetable/timetable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ClassroomRoutes),
    MaterialModule
  ],
  declarations: [
  	AttendanceComponent,
  	ClassComponent,
    ClassEditComponent,
  	HomeworkComponent,
  	PortionComponent,
    PortionEditComponent,
  	SectionComponent,
    SectionEditComponent,
  	TimetableComponent
 ]
})

export class ClassroomModule {}
