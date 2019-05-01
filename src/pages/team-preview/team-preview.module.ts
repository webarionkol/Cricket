import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamPreviewPage } from './team-preview';

@NgModule({
  declarations: [
    TeamPreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamPreviewPage),
  ],
})
export class TeamPreviewPageModule {}
