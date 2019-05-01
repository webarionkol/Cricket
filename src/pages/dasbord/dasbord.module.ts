import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DasbordPage } from './dasbord';

@NgModule({
  declarations: [
    DasbordPage,
  ],
  imports: [
    IonicPageModule.forChild(DasbordPage),
  ],
})
export class DasbordPageModule {}
