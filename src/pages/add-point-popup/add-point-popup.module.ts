import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPointPopupPage } from './add-point-popup';

@NgModule({
  declarations: [
    AddPointPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPointPopupPage),
  ],
})
export class AddPointPopupPageModule {}
