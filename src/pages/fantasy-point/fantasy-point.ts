import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the FantasyPointPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fantasy-point',
  templateUrl: 'fantasy-point.html'
})
export class FantasyPointPage {

  t20Root = 'T20Page'
  odiRoot = 'OdiPage'
  testRoot = 'TestPage'
  t10Root = 'T10Page'


  constructor(public navCtrl: NavController) {}

}
