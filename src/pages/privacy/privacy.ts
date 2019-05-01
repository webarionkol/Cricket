import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers , Response,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the PrivacyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {
 about:any;
  glo_user_token_v:any;
  glo_user_token='glo_user_token';
baseurl:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
  this.baseurl=localStorage.getItem('global_baseurl');
 }

  ionViewDidLoad() {
       this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
   var headers = new Headers();
   headers.append("Accept", 'application/json');

   headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
   const requestOptions = new RequestOptions({ headers: headers }); 

   let postData={
   

   }
   this.http.post(this.baseurl+"site_set",postData ,requestOptions)
   .subscribe(data => {

 /* console.log(JSON.parse(data['_body']).data[0]); */

 console.log(JSON.parse(data['_body']).data.details);


   this.about = JSON.parse(data['_body']).data.details.privacy_policy;
  // this.wallet_amt= JSON.parse(data['_body']).data.wallet_amt;
  //  console.log(JSON.parse(data['_body']).data.play_pt);

   });


  }

}
