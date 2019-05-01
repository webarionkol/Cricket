import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http, Headers,RequestOptions} from '@angular/http';
import {ProfilePage} from '../profile/profile';
/**
 * Generated class for the ProImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()
@Component({
  selector: 'page-pro-image',
  templateUrl: 'pro-image.html',
})
export class ProImagePage {
baseurl:any;
 glo_user_token_v:any;
  glo_user_token='glo_user_token';
  relationship:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController,public http:Http ) {
   this.baseurl=localStorage.getItem('global_baseurl');
  }
  
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProImagePage');
  }

  closeModal()
  {
    this.view.dismiss();
  }
  subimage(){ 
	 this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
   var headers = new Headers();
   headers.append("Accept", 'application/json');
   headers.append('Authorization','Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
            "name": this.relationship,
           
    }

    this.http.post(this.baseurl+"profile_image", postData, requestOptions)
      .subscribe(data => {
        console.log(data['_body']);
	 if(JSON.parse(data['_body']).status=='success')
       {
		   //this.navCtrl.setRoot(ProfilePage);
		   this.view.dismiss();
	   }
       }, error => {
        console.log(error);
      });
  }
//console.log(this.relationship);
	


}
