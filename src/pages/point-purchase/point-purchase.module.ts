import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointPurchasePage } from './point-purchase';

@NgModule({
  declarations: [
    PointPurchasePage,
  ],
  imports: [
    IonicPageModule.forChild(PointPurchasePage),
  ],
})
export class PointPurchasePageModule {}
