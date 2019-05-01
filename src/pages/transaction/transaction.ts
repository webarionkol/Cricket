import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Http, Headers , Response,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the TransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {

	 winnings:any;
	 withdrawls:any;
	 payments:any;
	 points:any;
	 cancel_contests:any;
	 abandons:any;
  glo_user_token_v:any;
  glo_user_token='glo_user_token';
baseurl:any;

  constructor(public navCtrl: NavController,public http:Http ,public navParams: NavParams, private modal:ModalController) {

	  this.baseurl=localStorage.getItem('global_baseurl');
  }

  openhistry(winning)
  {
    const myModal = this.modal.create('WinningPopupPage',{history:winning}) ;
    myModal.present();
   }
  
  withdrawhistory(withdraw)
   {
   const myModal = this.modal.create('WithdrawHistoryPage',{w_history:withdraw}) ;
    myModal.present();
   
   
   }
   paymenthistory(payment)
   {
    const myModal = this.modal.create('PaymentPopupPage',{u_payment:payment}) ;
    myModal.present();
   
   
   }
   pointwithdraw(point)
   {
    const myModal = this.modal.create('PointPopupPage',{u_point:point}) ;
    myModal.present();
   
   
   }
   
   cancelcontest(contest)
   {
       const myModal = this.modal.create('CancelContestPopupPage',{c_contest:contest}) ;
    myModal.present();
   
   }  

   abandonmatch(abandon)
   {
       const myModal = this.modal.create('AbandonPopupPage',{c_abandon:abandon}) ;
    myModal.present();
   
   }
   
   
   
   

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TransactionPage');

	  this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
    headers.append("Accept", 'application/json');

    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });

    let postData={
      "name": "Customer004",
      "email": "customer004@email.com",
      "tel": "0000252525"

    }

    this.http.post(this.baseurl+"view_withdraw",postData ,requestOptions)
       .subscribe(data => {

       this.winnings = JSON.parse(data['_body']).data.winning;
       this.withdrawls = JSON.parse(data['_body']).data.user_withdraw;
       this.payments = JSON.parse(data['_body']).data.payment_history;
       this.points = JSON.parse(data['_body']).data.withdraw_pts;
       this.cancel_contests = JSON.parse(data['_body']).data.cancel_contest;
       this.abandons = JSON.parse(data['_body']).data.abandon_match;

        console.log(JSON.parse(data['_body']).data.winning);

       });






  }



}
