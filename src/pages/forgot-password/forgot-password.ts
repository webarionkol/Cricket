import { Component } from '@angular/core';
import { IonicPage, NavController,App, NavParams } from 'ionic-angular';
import { Http,Headers,RequestOptions} from '@angular/http';
import { PasswordOtpPage  } from '../password-otp/password-otp';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
	
	 glo_user_token:'glo_user_token';
user_token:any;
displaymatch:any;
baseurl:any;
email:any;
error_msg:any;

  constructor(public navCtrl: NavController,public app:App, public navParams: NavParams,public http:Http) {
	   this.baseurl=localStorage.getItem('global_baseurl');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
	var postData={
  
}
//var global_baseurl=localStorage.getItem('global_baseurl');
	 this.http.post(this.baseurl+'site_set', postData)
      .subscribe(data => {
		  console.log(JSON.parse(data['_body']));
		  localStorage.setItem('site_name',JSON.parse(data['_body']).data.site_name);
		  this.displaymatch = JSON.parse(data['_body']).data.site_logo;
		  console.log(this.displaymatch)
	  });
	
	
  }
  
  
  onSubmit()
  {
	  
	  
	  var postData={
		  
		  "email":this.email
  
		}
//var global_baseurl=localStorage.getItem('global_baseurl');
	 this.http.post(this.baseurl+'forget', postData)
      .subscribe(data => {
		  console.log(JSON.parse(data['_body']));
		  
		 if(JSON.parse(data['_body']).status=='success')
		  {
		  
		  this.app.getRootNavs()[0].push(PasswordOtpPage,{uemail:this.email});
		  
		  }
		  else if(JSON.parse(data['_body']).status=='error'){
		  
		  this.error_msg=JSON.parse(data['_body']).data;
		  
		  }
		  
		  
		
	  });
	  
	  
	  
	  
	  
  
  
  
  
  
  }
  
  

}
