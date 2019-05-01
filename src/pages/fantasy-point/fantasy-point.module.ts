import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FantasyPointPage } from './fantasy-point';

@NgModule({
  declarations: [
    FantasyPointPage,
  ],
  imports: [
    IonicPageModule.forChild(FantasyPointPage),
  ]
})
export class FantasyPointPageModule {}
