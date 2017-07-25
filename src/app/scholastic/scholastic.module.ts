import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialModule } from '../shared/materialmodule.module';
import { ScholasticRoutes } from './scholastic.routing';
import { ActivityComponent } from './activity/activity.component';
import { ActivityScoreComponent } from './activity-score/activity-score.component';
import { ExamComponent } from './exam/exam.component';
import { ExamEditComponent } from './exam/exam-edit.component';
import { ExamSubjectGroupComponent } from './exam-subject-group/exam-subject-group.component'
import { ExamSubjectComponent } from './exam-subject/exam-subject.component';
import { GradeClassWiseComponent } from './grade-class-wise/grade-class-wise.component';
import { MarkComponent } from './mark/mark.component';
import { SliptestComponent } from './sliptest/sliptest.component';
import { SliptestEditComponent } from './sliptest/sliptest-edit.component';
import { SliptestScoreComponent } from './sliptest-score/sliptest-score.component';
import { SubActivityComponent } from './subactivity/subactivity.component';
import { SubActivityScoreComponent } from './subactivity-score/subactivity-score.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ScholasticRoutes),
    NgbProgressbarModule,
    MaterialModule
  ],
  declarations: [
    ActivityComponent, ActivityScoreComponent,
    ExamComponent, ExamEditComponent, MarkComponent,
    ExamSubjectGroupComponent,
    ExamSubjectComponent,
    GradeClassWiseComponent,
    SliptestComponent, SliptestEditComponent,
    SliptestScoreComponent,
    SubActivityComponent, SubActivityScoreComponent
   ]
})

export class ScholasticModule {}
