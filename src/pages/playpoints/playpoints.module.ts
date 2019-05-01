import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaypointsPage } from './playpoints';

@NgModule({
  declarations: [
    PlaypointsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaypointsPage),
  ],
})
export class PlaypointsPageModule {}
