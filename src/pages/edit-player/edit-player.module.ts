import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPlayerPage } from './edit-player';

@NgModule({
  declarations: [
    EditPlayerPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPlayerPage),
  ]
})
export class EditPlayerPageModule {}
