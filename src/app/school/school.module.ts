import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SchoolComponent } from './school.component';
import { SchoolEditComponent } from './school-edit.component';
import { schoolRoutes } from './school.routing';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(schoolRoutes)],
  declarations: [SchoolComponent, SchoolEditComponent]
})

export class SchoolModule {}
