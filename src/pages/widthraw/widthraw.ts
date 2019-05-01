import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Http, Headers , Response,RequestOptions} from '@angular/http';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/**
 * Generated class for the WidthrawPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-widthraw',
  templateUrl: 'widthraw.html',
})
export class WidthrawPage {
  user_details:any=[];
  play_pt:any;
  wallet_amt:any;
  glo_user_token_v:any;
  glo_user_token='glo_user_token';
baseurl:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,private modal: ModalController,public http: Http) {
 this.baseurl=localStorage.getItem('global_baseurl');
  }
 ionViewDidLoad() {
 
 
 this.withtdrawLoad();
 
 }
  withtdrawLoad() {
    console.log('ionViewDidLoad WidthrawPage');
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

     /* console.log(JSON.parse(data['_body']).data[0]);
     console.log(JSON.parse(data['_body']).status);  */



       this.play_pt = JSON.parse(data['_body']).data.play_pt;
       this.wallet_amt= JSON.parse(data['_body']).data.wallet_amt;
        console.log(JSON.parse(data['_body']).data.play_pt);
     /*   var arr=[];


        Object.keys(displaydetails).forEach(function(key)
{
    arr.push(displaydetails[key]);
  console.log(displaydetails[key]);

});
this.user_profile = arr; */






       });

  }



  get_details()
  {
   // this.glo_user_token_v= localStorage.getItem(this.glo_user_token);



  }

  openenterpoints()
  {
   /*  const myModal = this.modal.create('WidthdrawPopupPage') ;
    myModal.present(); */
	
	let modal = this.modal.create('WidthdrawPopupPage');
    modal.onDidDismiss(() => {
      this.withtdrawLoad();
    });
    modal.present();
	
   }
   
   playpt()
   {
   
   let modal = this.modal.create('PlayPointPopupPage');
    modal.onDidDismiss(() => {
      this.withtdrawLoad();
    });
    modal.present();
   
   
   }
   
   
   

   openhistry()
   {
     const myModal = this.modal.create('WinningPopupPage') ;
     myModal.present();
    }

}
