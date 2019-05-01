import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WkPage } from './wk';

@NgModule({
  declarations: [
    WkPage,
  ],
  imports: [
    IonicPageModule.forChild(WkPage),
  ],
})
export class WkPageModule {}
