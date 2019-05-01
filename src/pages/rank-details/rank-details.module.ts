import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RankDetailsPage } from './rank-details';

@NgModule({
  declarations: [
    RankDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RankDetailsPage),
  ],
})
export class RankDetailsPageModule {}
