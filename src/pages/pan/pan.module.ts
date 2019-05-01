import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PanPage } from './pan';

@NgModule({
  declarations: [
    PanPage,
  ],
  imports: [
    IonicPageModule.forChild(PanPage),
  ],
})
export class PanPageModule {}
