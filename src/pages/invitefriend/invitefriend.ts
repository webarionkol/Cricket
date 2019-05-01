import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Http, Headers ,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the InvitefriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invitefriend',
  templateUrl: 'invitefriend.html',
})
export class InvitefriendPage {
	
	glo_user_token='glo_user_token';
glo_user_token_v:any;
baseurl:any;
get_ref:any;
error_msg:any;
referal_pts:any;
user_pts:any;

  constructor(public navCtrl: NavController,public http:Http ,public navParams: NavParams,private socialSharing: SocialSharing) {
  
  this.baseurl=localStorage.getItem('global_baseurl');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad InvitefriendPage');
	this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
 
		    
		 var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
   const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
             "dumyy":'dummy'
           
    }
 
    this.http.post(this.baseurl+"pt_referals", postData, requestOptions)
      .subscribe(data => {
		  
		  this.referal_pts=JSON.parse(data['_body']).data.referer;
		  this.user_pts=JSON.parse(data['_body']).data.user_reward_pts;
		  
		  
	  });
	
	
	
	
  }
  
  shareurl()
  {
  
   this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
		    
		 var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
   const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
             "name": "Customer004",
            "email": "customer004@email.com",
            "tel": "0000252525" 
    }
 
    this.http.post(this.baseurl+"get_referal_link", postData, requestOptions)
      .subscribe(data => {
     
		//console.log(JSON.parse(data['_body']).data); 
		if(JSON.parse(data['_body']).status=='success')
		{
		this.get_ref=JSON.parse(data['_body']).data;
		this.socialSharing.share(null,null,null,this.get_ref);
		
		
		}
		
	  });
  
  
  
  
  
  
  
  }
  

}
