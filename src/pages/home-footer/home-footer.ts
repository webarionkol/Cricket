import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the HomeFooterPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-footer',
  templateUrl: 'home-footer.html'
})
export class HomeFooterPage {

  dasbordRoot = 'DasbordPage'
  matchesRoot = 'MatchesPage'
  profileRoot = 'ProfilePage'
  moreRoot = 'MorePage'


  constructor(public navCtrl: NavController) {}

}
