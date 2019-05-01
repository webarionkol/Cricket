import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentTransactionPage } from './payment-transaction';

@NgModule({
  declarations: [
    PaymentTransactionPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentTransactionPage),
  ],
})
export class PaymentTransactionPageModule {}
