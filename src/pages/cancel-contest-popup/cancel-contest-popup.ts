import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CancelContestPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cancel-contest-popup',
  templateUrl: 'cancel-contest-popup.html',
})
export class CancelContestPopupPage {
	contests:any;
	c_name:any;
	enterance_amt:any;
	date:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
	  this.contests=navParams.get('c_contest');
	  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelContestPopupPage');
	this.c_name=this.contests.contest_name;
	this.enterance_amt=this.contests.contest_enterance;
	this.date=this.contests.refund_date;
	
	
	
  }

  closeModal()
  {
    this.view.dismiss();
  }
  
  
}
