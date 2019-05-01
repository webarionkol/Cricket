import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the VerifyPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html'
})
export class VerifyPage {

  mobileRoot = 'MobilePage'
  panRoot = 'PanPage'
  bankRoot = 'BankPage'


  constructor(public navCtrl: NavController) {}

}
