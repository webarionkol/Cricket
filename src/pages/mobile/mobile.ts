import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Http, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { OtpPage } from '../otp/otp';

/**
 * Generated class for the MobilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mobile',
  templateUrl: 'mobile.html',
})
export class MobilePage {
  mobile_status:any;
  mobile:any;
  error_msg:any;
  message:any;
  glo_user_token_v:any;
  glo_user_token='glo_user_token';
  mobile_no:any;
  my_mobile:any;
  baseurl:any;
  session_mob:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http, public app: App) {
 this.baseurl=localStorage.getItem('global_baseurl');
 }

  ionViewDidLoad() {

   this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
   var headers = new Headers();
   headers.append("Accept", 'application/json');
   headers.append('Authorization','Bearer '+this.glo_user_token_v);
   const requestOptions = new RequestOptions({ headers: headers });

   let postData={
     "name": "Customer004",
     "email": "customer004@email.com",
     "tel": "0000252525"

   }
   console.log(postData);
   this.http.post(this.baseurl+"bank_verify",postData ,requestOptions)
      .subscribe(data => {

      this.mobile_status = JSON.parse(data['_body']).data.mobile_status;
      this.mobile_no = JSON.parse(data['_body']).data.mobile;
      this.message = JSON.parse(data['_body']).data.message;

       console.log(JSON.parse(data['_body']).data.mobile_status);






      });
  }

  otpSend()
  {
    // let my_mobile = this.mobile_no;
    //let password = this.password;
    this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization','Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });


    var postData={
      "mobile_no": this.mobile_no,

    }
    this.http.post(this.baseurl+"bank_otp", postData,requestOptions)
    .subscribe(data => {



if(JSON.parse(data['_body']).status=='success'){
  let my_mobile = this.mobile_no;
  let session_mob=my_mobile;
  console.log('dsds'+my_mobile);
  this.app.getRootNavs()[0].push(OtpPage,{OTP:session_mob});

}
else if(JSON.parse(data['_body']).status=='error')
{

console.log(this.error_msg);
// this.navCtrl.setRoot(RegisterPage);
}
});


  }




}
