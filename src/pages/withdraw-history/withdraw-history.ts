import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the WithdrawHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-withdraw-history',
  templateUrl: 'withdraw-history.html',
})
export class WithdrawHistoryPage {
	
	amount:any;
	wstatus:any;
	date:any;
	my_winning:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
	  this.my_winning=navParams.get('w_history');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad WithdrawHistoryPage');
	this.wstatus=this.my_winning.deposite_status;
	this.amount=this.my_winning.withdraw_amount;
	this.date=this.my_winning.withdraw_request_at;
	
	
  }
  
  closeModal()
  {
    this.view.dismiss();
  }

}
