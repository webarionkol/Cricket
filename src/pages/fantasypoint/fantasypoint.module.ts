import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FantasypointPage } from './fantasypoint';

@NgModule({
  declarations: [
    FantasypointPage,
  ],
  imports: [
    IonicPageModule.forChild(FantasypointPage),
  ],
})
export class FantasypointPageModule {}
