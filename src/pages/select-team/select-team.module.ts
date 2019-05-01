import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectTeamPage } from './select-team';

@NgModule({
  declarations: [
    SelectTeamPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectTeamPage),
  ],
})
export class SelectTeamPageModule {}
