import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCashPage } from './add-cash';

@NgModule({
  declarations: [
    AddCashPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCashPage),
  ],
})
export class AddCashPageModule {}
