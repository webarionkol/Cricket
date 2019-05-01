import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http, Headers , Response,RequestOptions} from '@angular/http';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the AddPointPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-point-popup',
  templateUrl: 'add-point-popup.html',
})
export class AddPointPopupPage {
	
	 glo_user_token_v:any;
  glo_user_token='glo_user_token';
    baseurl:any;
    withdraw_amount:any;
    error_msg:any;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public http:Http ,public navParams: NavParams, public view: ViewController) {
 
 this.baseurl=localStorage.getItem('global_baseurl');

 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPointPopupPage');
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
      "credit":amount


    }

  //  console.log('amount___'+amount);

    this.http.post(this.baseurl+"point_purchase",postData ,requestOptions)
       .subscribe(data => {

          if(JSON.parse(data['_body']).status=='success')
          {

           this.closeModal();
		   let toast = this.toastCtrl.create({
			message:this.withdraw_amount+'has converted to play-point successfully',
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
