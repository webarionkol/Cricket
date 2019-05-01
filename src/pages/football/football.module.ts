import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FootballPage } from './football';

@NgModule({
  declarations: [
    FootballPage,
  ],
  imports: [
    IonicPageModule.forChild(FootballPage),
  ],
})
export class FootballPageModule {}
