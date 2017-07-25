import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MaterialModule } from '../shared/materialmodule.module';
import { PeopleRoutes } from './people.routing';
import { StudentComponent } from './student/student.component';
import { StudentEditComponent } from './student/student-edit.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherEditComponent } from './teacher/teacher-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PeopleRoutes),
    NgxDatatableModule,
    MaterialModule
  ],
  declarations: [
    StudentComponent,
    StudentEditComponent,
    TeacherComponent,
    TeacherEditComponent
  ]
})

export class PeopleModule {}
