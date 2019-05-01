import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Http, Headers,RequestOptions} from '@angular/http';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  glo_user_token_v:any;
  glo_user_token='glo_user_token';
  name:string;
  gender:string;
  address:string;
  city:string;
  state:string;
  pincode:any;
  phone:any;
  country:any;
  email:any;
baseurl:any;
image:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController,public http:Http) {
  this.baseurl=localStorage.getItem('global_baseurl');
  }

  ionViewDidLoad() {
	  this.profileimagechange();
  }
profileimagechange(){	  

    this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
   var headers = new Headers();
   headers.append("Accept", 'application/json');
   headers.append('Authorization','Bearer '+this.glo_user_token_v);
   const requestOptions = new RequestOptions({ headers: headers });

   let postData={


   }
   this.http.post(this.baseurl+"profile",postData ,requestOptions)
      .subscribe(data => {



       if(JSON.parse(data['_body']).status=='success')
       {
        this.name=JSON.parse(data['_body']).data.name;
        this.gender=JSON.parse(data['_body']).data.gender;
        this.address=JSON.parse(data['_body']).data.address;
        this.city=JSON.parse(data['_body']).data.city;
        this.state=JSON.parse(data['_body']).data.state;
        this.pincode=JSON.parse(data['_body']).data.pincode;
        this.phone=JSON.parse(data['_body']).data.mobile_number;
        this.country=JSON.parse(data['_body']).data.country;
        this.email=JSON.parse(data['_body']).data.email; 
		this.image=JSON.parse(data['_body']).data.image;

console.log(this.image);
       }
      },(err)=>{
		  
	    this.navCtrl.setRoot(LoginPage)
	  
	  
	  });




    //console.log('ionViewDidLoad ProfilePage');
  }

  openedit()
  {
    const myModal = this.modal.create('EditProfilePage') ;
    myModal.present();
   }

   openchangepassword()
   {
     const myModal = this.modal.create('ChangePassPage') ;
     myModal.present();
    }
	
	 openimage()
   {
	   let myModal = this.modal.create('ProImagePage');
    myModal.onDidDismiss(() => {
      this.profileimagechange();
    });
    myModal.present();
	
     //const myModal = this.modal.create('ProImagePage') ;
    // myModal.present();
    }

}
