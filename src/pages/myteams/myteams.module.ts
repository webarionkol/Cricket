import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyteamsPage } from './myteams';

@NgModule({
  declarations: [
    MyteamsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyteamsPage),
  ],
})
export class MyteamsPageModule {}
