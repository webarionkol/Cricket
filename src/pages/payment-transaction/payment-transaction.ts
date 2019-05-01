import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaymentTransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-transaction',
  templateUrl: 'payment-transaction.html',
})
export class PaymentTransactionPage {
	t_data:any;
	payment_data:any;
	transaction_id:any;
	pay_status:any;
	amount:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  
	this.t_data=navParams.get('my_data');  
	console.log('Cons___'+JSON.stringify(this.t_data));
  
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentTransactionPage');
	
	
	this.transaction_id=this.t_data.t_id;
	this.pay_status=this.t_data.state;
	this.amount=this.t_data.payment_amount;
	
	
  }

}
