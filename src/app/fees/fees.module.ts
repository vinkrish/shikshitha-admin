import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/materialmodule.module';
import { FeesRoutes } from './fees.routing';
import { FeeClassComponent } from './fee-class/fee-class.component';
import { FeeStudentComponent } from './fee-student/fee-student.component';
import { FeeTransactionComponent } from './fee-transaction/fee-transaction.component';
import { FeeTransactionEditComponent } from './fee-transaction/fee-transaction-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(FeesRoutes),
    MaterialModule
  ],
  declarations: [
  	FeeClassComponent,
  	FeeStudentComponent,
  	FeeTransactionComponent,
  	FeeTransactionEditComponent
 ]
})

export class FeesModule {}
