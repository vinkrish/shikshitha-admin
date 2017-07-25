import { NgModule } from '@angular/core';
import {MdButtonModule, MdToolbarModule, MdInputModule} from '@angular/material';

@NgModule({
  imports: [MdButtonModule, MdToolbarModule, MdInputModule],
  exports: [MdButtonModule, MdToolbarModule, MdInputModule],
})
export class MaterialModule { }