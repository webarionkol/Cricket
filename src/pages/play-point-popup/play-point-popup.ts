import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http, Headers , Response,RequestOptions} from '@angular/http';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';



/**
 * Generated class for the PlayPointPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-play-point-popup',
  templateUrl: 'play-point-popup.html',
})
export class PlayPointPopupPage {
	
	 glo_user_token_v:any;
  glo_user_token='glo_user_token';
baseurl:any;
 withdraw_amount:any;
 wallet_amt:any;
    error_msg:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public view: ViewController,public toastCtrl: ToastController,public http: Http) {
	  
	  this.baseurl=localStorage.getItem('global_baseurl');
	  
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PlayPointPopupPage');
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

       // this.wallet_amt= JSON.parse(data['_body']).data.wallet_amt;


       });
	
  }
  
  
    post_request()
  {
    this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
    headers.append("Accept", 'application/json');

    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });
   let amount=this.withdraw_amount;

    let postData={
      "playpt":amount


    }

    console.log('amount___'+amount);

    this.http.post(this.baseurl+"withdraw_pt_request",postData ,requestOptions)
       .subscribe(data => {

          if(JSON.parse(data['_body']).status=='success')
          {

           this.closeModal();
		   let toast = this.toastCtrl.create({
			message:this.withdraw_amount+' has requested successfully',
			duration: 2000,
		
			position:'middle'
			
  });
  toast.present();

          }else if(JSON.parse(data['_body']).status=='error'){


              this.error_msg=JSON.parse(data['_body']).data.message;
          }



        //this.wallet_amt= JSON.parse(data['_body']).data.wallet_amtSON.parse(data['_body']).data.wallet_amt;


       });



  }

  closeModal()
  {
    this.view.dismiss();
  }

}
