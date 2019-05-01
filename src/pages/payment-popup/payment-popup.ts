import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PaymentPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-popup',
  templateUrl: 'payment-popup.html',
})
export class PaymentPopupPage {
	
	payment:any;
	pay_method:any;
	amount:any;
	date:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
 
this.payment=navParams.get('u_payment');

 }

  ionViewDidLoad() {
  //  console.log('ionViewDidLoad PaymentPopupPage');
  
  this.pay_method=this.payment.payment_method;
  this.amount=this.payment.payment_amount;
  this.date=this.payment.created_at;
  
  
  
  }
  
  closeModal()
  {
    this.view.dismiss();
  }


}
