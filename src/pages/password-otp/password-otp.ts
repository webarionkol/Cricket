import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage  } from '../login/login';
import { Http,Headers,RequestOptions} from '@angular/http';

/**
 * Generated class for the PasswordOtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-otp',
  templateUrl: 'password-otp.html',
})
export class PasswordOtpPage {
	
	baseurl:any;
	error_msg:any;
	otp:any;
	password:any;
	cpassword:any;
	displaymatch:any;
	uemail:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
  
  this.baseurl=localStorage.getItem('global_baseurl');
  
  
  this.uemail=navParams.get('uemail');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordOtpPage');
	var postData={
  
}
//var global_baseurl=localStorage.getItem('global_baseurl');
	 this.http.post(this.baseurl+'site_set', postData)
      .subscribe(data => {
		  console.log(JSON.parse(data['_body']));
		  //localStorage.setItem('site_name',JSON.parse(data['_body']).data.site_name);
		  this.displaymatch = JSON.parse(data['_body']).data.site_logo;
		  console.log(this.displaymatch)
	  });
	
	
	
	
  }
  
  
  onSubmit()
  {
  
   var postData={
		  "email":this.uemail,
		  "otp":this.otp,
		  "pass":this.password,
		  "confirmpassword":this.cpassword
  
		}
//var global_baseurl=localStorage.getItem('global_baseurl');
	 this.http.post(this.baseurl+'password_otp', postData)
      .subscribe(data => {
		  console.log(JSON.parse(data['_body']));
		  
		 if(JSON.parse(data['_body']).status=='success')
		  {
		  
		  this.navCtrl.setRoot(LoginPage);
		  
		  }
		  else if(JSON.parse(data['_body']).status=='error'){
		  
		  this.error_msg=JSON.parse(data['_body']).data;
		  
		  }
  
  
  
  });
  

}
}
