import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/materialmodule.module';
import { TopicRoutes } from './topic.routing';
import { ClassSubjectGroupComponent } from './class-subject-group/class-subject-group.component';
import { ClassSubjectGroupEditComponent } from './class-subject-group/class-subject-group-edit.component';
import { SubjectGroupComponent } from './subject-group/subject-group.component';
import { SubjectGroupEditComponent } from './subject-group/subject-group-edit.component';
import { SubjectGroupSubjectComponent } from './subject-group-subject/subject-group-subject.component';
import { SubjectGroupSubjectEditComponent } from './subject-group-subject/subject-group-subject-edit.component';
import { SubjectStudentComponent } from './subject-student/subject-student.component';
import { SubjectTeacherComponent } from './subject-teacher/subject-teacher.component';
import { SubjectTeacherEditComponent } from './subject-teacher/subject-teacher-edit.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectsEditComponent } from './subjects/subjects-edit.component';
import { EventComponent } from './events/event.component';
import { EventEditComponent } from './events/event-edit.component';
import { ClassEventComponent } from './class-event/class-event.component';
import { ClassEventEditComponent } from './class-event/class-event-edit.component';
import { DatePipe } from '@angular/common';
import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(TopicRoutes),
    MaterialModule,
    MomentModule
  ],
  declarations: [
  	ClassSubjectGroupComponent,
    ClassSubjectGroupEditComponent,
  	SubjectGroupComponent,
    SubjectGroupEditComponent,
  	SubjectGroupSubjectComponent,
    SubjectGroupSubjectEditComponent,
  	SubjectStudentComponent,
  	SubjectTeacherComponent,
    SubjectTeacherEditComponent,
  	SubjectsComponent,
    SubjectsEditComponent,
    EventComponent,
    EventEditComponent,
    ClassEventComponent,
    ClassEventEditComponent
  ],
  providers: [DatePipe]
})

export class TopicModule {}
