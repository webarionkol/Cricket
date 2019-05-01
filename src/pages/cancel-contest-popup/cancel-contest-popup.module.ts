import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CancelContestPopupPage } from './cancel-contest-popup';

@NgModule({
  declarations: [
    CancelContestPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(CancelContestPopupPage),
  ],
})
export class CancelContestPopupPageModule {}
