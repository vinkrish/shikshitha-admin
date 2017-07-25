import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialModule } from '../shared/materialmodule.module';
import { CoscholasticRoutes } from './coscholastic.routing';
import { AspectGradeComponent } from './cce-aspect-grade/cce-aspect-grade.component';
import { AspectPrimaryComponent } from './cce-aspect-primary/cce-aspect-primary.component';
import { CceCoschComponent } from './cce-coscholastic/cce-coscholastic.component';
import { CceCoschEditComponent } from './cce-coscholastic/cce-coscholastic-edit.component';
import { CceCoschClassComponent } from './cce-coscholastic-class/cce-coscholastic-class.component';
import { CceCoschClassEditComponent } from './cce-coscholastic-class/cce-coscholastic-class-edit.component';
import { SectionHeadingComponent } from './cce-section-heading/cce-section-heading.component';
import { SectionHeadingEditComponent } from './cce-section-heading/cce-section-heading-edit.component';
import { CceStudentProfileComponent } from './cce-student-profile/cce-student-profile.component';
import { TopicGradeComponent } from './cce-topic-grade/cce-topic-grade.component';
import { TopicPrimaryComponent } from './cce-topic-primary/cce-topic-primary.component';
import { TopicPrimaryEditComponent } from './cce-topic-primary/cce-topic-primary-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(CoscholasticRoutes),
    NgbTooltipModule,
    MaterialModule
  ],
  declarations: [
  	AspectGradeComponent,
  	AspectPrimaryComponent, 
  	CceCoschComponent,
    CceCoschEditComponent,
  	CceCoschClassComponent,
    CceCoschClassEditComponent,
  	SectionHeadingComponent,
    SectionHeadingEditComponent,
  	CceStudentProfileComponent,
  	TopicGradeComponent,
  	TopicPrimaryComponent,
    TopicPrimaryEditComponent
  ]
})

export class CoscholasticModule {}
