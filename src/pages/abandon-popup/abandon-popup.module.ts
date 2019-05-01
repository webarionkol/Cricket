import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbandonPopupPage } from './abandon-popup';

@NgModule({
  declarations: [
    AbandonPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(AbandonPopupPage),
  ],
})
export class AbandonPopupPageModule {}
