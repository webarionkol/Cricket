import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the MatchPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html'
})
export class MatchPage {

  cricketRoot = 'CricketPage'
  footballRoot = 'FootballPage'


  constructor(public navCtrl: NavController) {}

}
