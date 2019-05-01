import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentPopupPage } from './payment-popup';

@NgModule({
  declarations: [
    PaymentPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentPopupPage),
  ],
})
export class PaymentPopupPageModule {}
