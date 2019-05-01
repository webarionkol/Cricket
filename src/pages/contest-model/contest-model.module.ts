import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContestModelPage } from './contest-model';

@NgModule({
  declarations: [
    ContestModelPage,
  ],
  imports: [
    IonicPageModule.forChild(ContestModelPage),
  ],
})
export class ContestModelPageModule {}
