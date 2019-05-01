import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the WinningPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-winning-popup',
  templateUrl: 'winning-popup.html',
})
export class WinningPopupPage {
	my_winning:any;
	contest_name:any;
	amount:any;
	win_date:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  
  this.my_winning=navParams.get('history');
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WinningPopupPage');
	
	this.contest_name=this.my_winning.contest_name;
	this.amount=this.my_winning.amount;
	this.win_date=this.my_winning.win_date;
	
	//console.log('ARrra___'+this.my_winning.contest_name);
  }

  closeModal()
  {
    this.view.dismiss();
  }

}
