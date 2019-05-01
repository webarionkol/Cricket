import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
//import { HttpClient } from '@angular/common/http';
//import { RouterModule  } from "@angular/router";
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
//import {Observable} from 'rxjs/Observable';
import { EmailValidator } from '@angular/forms';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  name: string;
  email: EmailValidator;
  mobile_no:number;
  password: string;
  user_pts: any;
  error_msg:any;
  error_email:any;
  error_name:any;
  error_mobile:any;
  error_password:any;

baseurl:any;





  constructor(public navCtrl: NavController,public http: Http) {
    console.log('Hello LoginComponent Component');
this.baseurl=localStorage.getItem('global_baseurl');
  }

  onSubmit() {

    let name = this.name;
    let password = this.password;
    let mobile_no=this.mobile_no;
    let email=this.email;
    // console.log(user)
    // console.log(pass)
var postData={
  "email": email,
  "password":password,
  "mobile_number":mobile_no,
  "name":name
}




    this.http.post(this.baseurl+"register", postData)
      .subscribe(data => {



if(JSON.parse(data['_body']).status=='success'){


  this.navCtrl.setRoot(LoginPage);

}
else if(JSON.parse(data['_body']).status=='error')
{
  this.error_email=JSON.parse(data['_body']).data.email;
  this.error_name=JSON.parse(data['_body']).data.name;
  this.error_password=JSON.parse(data['_body']).data.password;
  this.error_mobile=JSON.parse(data['_body']).data.mobile_number;
  this.error_msg=JSON.parse(data['_body']).data.message;
  console.log(this.error_msg);
 // this.navCtrl.setRoot(RegisterPage);
}
});



  }





  ionViewDidLoad() {
   // console.log('ionViewDidLoad RegisterPage');
   
   
   var postData={
  
}




    this.http.post(this.baseurl+"site_set", postData)
      .subscribe(data => {
		  
		  
		  this.user_pts=JSON.parse(data['_body']).data.normal_user_reward_pts;
		  
	  });
   
   
   
   
   
   
   
  }
  Goto_login(){this.navCtrl.setRoot(LoginPage);}
}
