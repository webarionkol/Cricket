import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { InvitefriendPage } from '../invitefriend/invitefriend';
import { InvitecodePage } from '../invitecode/invitecode';
import { HowtoplayPage } from '../howtoplay/howtoplay';
import { FantasyPointPage } from '../fantasy-point/fantasy-point';
import { AboutPage } from '../about/about';
import { FaqPage } from '../faq/faq';
import { PrivacyPage } from '../privacy/privacy';
import { TermsPage } from '../terms/terms';
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }
  Goto_invitefriend()
  {
    this.app.getRootNavs()[0].push(InvitefriendPage);
  }
  Goto_invitecode()
  {
    this.app.getRootNavs()[0].push(InvitecodePage);
  }
  Goto_howtoplay()
  {
    this.app.getRootNavs()[0].push(HowtoplayPage);
  }
  Goto_fantasypoint()
  {
    this.app.getRootNavs()[0].push(FantasyPointPage);
  }
  Goto_about()
  {
    this.app.getRootNavs()[0].push(AboutPage);
  }
  Goto_faq()
  {
    this.app.getRootNavs()[0].push(FaqPage);
  } 
  Goto_terms()
  {
    this.app.getRootNavs()[0].push(TermsPage);
  }
  Goto_privacy()
  {
    this.app.getRootNavs()[0].push(PrivacyPage);
  }

}
