import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AbandonPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-abandon-popup',
  templateUrl: 'abandon-popup.html',
})
export class AbandonPopupPage {
	abandon:any;
	c_name:any;
	enterance_amt:any;
	date:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
	  this.abandon=navParams.get('c_abandon');
	  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AbandonPopupPage');
	
	this.c_name=this.abandon.contest_name;
	this.enterance_amt=this.abandon.contest_enterance;
	this.date=this.abandon.refund_date;
	
  }
  
   closeModal()
  {
    this.view.dismiss();
  }

}
