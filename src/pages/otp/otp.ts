import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Http, Headers,RequestOptions} from '@angular/http';
import {VerifyPage} from '../verify/verify';

/**
 * Generated class for the OtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {
  mobile:any;
  otp:any;
  error_msg:any;
  glo_user_token_v:any;
  glo_user_token='glo_user_token';
 // mobile_no:any;
baseurl:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
   
this.baseurl=localStorage.getItem('global_baseurl');
   this.mobile = navParams.get('OTP');
    //console.log('adsad'+this.mobile);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpPage');
  }


  resnd()
  {

    this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization','Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });


    var postData={
      "mobile_no": this.mobile,

    }
    this.http.post(this.baseurl+"bank_otp", postData,requestOptions)
    .subscribe(data => {



if(JSON.parse(data['_body']).status=='success'){

  console.log(JSON.parse(data['_body']).data.message);


}
else if(JSON.parse(data['_body']).status=='error')
{

console.log(this.error_msg);
// this.navCtrl.setRoot(RegisterPage);
}
});






  }

  verify()
{

  this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
  var headers = new Headers();
  headers.append("Accept", 'application/json');
  headers.append('Authorization','Bearer '+this.glo_user_token_v);
  const requestOptions = new RequestOptions({ headers: headers });


  var postData={
    "otp":this.otp,
    "mobile":this.mobile

  }
  this.http.post(this.baseurl+"verify_otp", postData,requestOptions)
  .subscribe(data => {
    if(JSON.parse(data['_body']).status=='success'){

      this.navCtrl.setRoot(VerifyPage);

    }
    else if(JSON.parse(data['_body']).status=='error')
    {

    console.log(this.error_msg);
    // this.navCtrl.setRoot(RegisterPage);
    }


  });




}




}
