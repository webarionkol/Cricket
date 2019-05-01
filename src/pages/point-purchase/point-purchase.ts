import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Http, Headers , Response,RequestOptions} from '@angular/http';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the PointPurchasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-point-purchase',
  templateUrl: 'point-purchase.html',
})
export class PointPurchasePage {
	
	 wallet_amt:any;
	 play_pt:any;
 
  glo_user_token_v:any;
  glo_user_token='glo_user_token';
baseurl:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,private modal: ModalController,public http: Http) {
 
this.baseurl=localStorage.getItem('global_baseurl');

 }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PointPurchasePage');
 
 this.playptLoad();

 }
 
 
  playptLoad() {
    //console.log('ionViewDidLoad WidthrawPage');
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

       this.wallet_amt = JSON.parse(data['_body']).data.wallet_amt;
	   this.play_pt = JSON.parse(data['_body']).data.play_pt;
      
       });

  }
  
  
  playpoint()
  {
  let modal = this.modal.create('AddPointPopupPage');
    modal.onDidDismiss(() => {
      this.playptLoad();
    });
    modal.present();
  
  
  }
 
 
 
 
 
 
 
 
 

}
