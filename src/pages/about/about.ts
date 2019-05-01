import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams } from 'ionic-angular';
import { Http, Headers , Response,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  about:any;
  glo_user_token_v:any;
  glo_user_token='glo_user_token';
baseurl:any;

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public http:Http,public navParams: NavParams) {
    this.baseurl=localStorage.getItem('global_baseurl');
  }

  ionViewDidLoad() {
 
  let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/loader.gif" />`
      //duration: 5000
    });
    loading.present();

   this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
   var headers = new Headers();
   headers.append("Accept", 'application/json');

   headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
   const requestOptions = new RequestOptions({ headers: headers }); 

   let postData={
    "type":"about"

   }
   this.http.post(this.baseurl+"pages",postData ,requestOptions)
   .subscribe(data => {

  loading.dismiss();
 console.log(JSON.parse(data['_body']).data);


   this.about = JSON.parse(data['_body']).data.about_us;
  

   });




  }

}
