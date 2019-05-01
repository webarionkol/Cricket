import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers,RequestOptions} from '@angular/http';

/**
 * Generated class for the OdiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-odi',
  templateUrl: 'odi.html',
})
export class OdiPage {


  each_run:any;
  each_four:any;
  each_six:any;
  century:any;
  half_century:any;
  per_wicket:any;
  catch:any;
  caught_bowled:any;
  dismissal_for_duck:any;
  maiden_over:any;
  wickets_4:any;
  wickets_5:any;
  stumping:any;
  run_out:any;
  economy_rate_below_4:any;
  economy_rate_4_5:any;
  economy_rate_5_6:any;
  economy_rate_6_7:any;
  economy_rate_7_9:any;
  economy_rate_above_9:any;
  strike_rate_60_70:any;
  strike_rate_50_60:any;
  strike_rate_below_50:any;
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
   headers.append('Authorization','Bearer '+this.glo_user_token_v);
   const requestOptions = new RequestOptions({ headers: headers });

   let postData={

      'type':'odi'
   }
   this.http.post(this.baseurl+"match_pts",postData ,requestOptions)
       .subscribe(data => {

     /* console.log(JSON.parse(data['_body']).data[0]);
     console.log(JSON.parse(data['_body']).status);  */



       this.each_run = JSON.parse(data['_body']).data.each_run;
       this.each_four= JSON.parse(data['_body']).data.each_four;
       this.each_six= JSON.parse(data['_body']).data.each_six;
       this.century= JSON.parse(data['_body']).data.century;
       this.half_century= JSON.parse(data['_body']).data.half_century;
       this.per_wicket= JSON.parse(data['_body']).data.per_wicket;
       this.catch= JSON.parse(data['_body']).data.catch;
       this.caught_bowled= JSON.parse(data['_body']).data.caught_bowled;
       this.dismissal_for_duck= JSON.parse(data['_body']).data.dismissal_for_duck;
       this.maiden_over= JSON.parse(data['_body']).data.maiden_over;
       this.wickets_4= JSON.parse(data['_body']).data.wickets_4;
       this.wickets_5= JSON.parse(data['_body']).data.wickets_5;
       this.stumping= JSON.parse(data['_body']).data.stumping;
       this.run_out= JSON.parse(data['_body']).data.run_out;
       this.economy_rate_below_4= JSON.parse(data['_body']).data.economy_rate_below_4;
       this.economy_rate_4_5= JSON.parse(data['_body']).data.economy_rate_4_5;
       this.economy_rate_5_6= JSON.parse(data['_body']).data.economy_rate_5_6;
       this.economy_rate_6_7= JSON.parse(data['_body']).data.economy_rate_6_7;
       this.economy_rate_7_9= JSON.parse(data['_body']).data.economy_rate_7_9;
       this.economy_rate_above_9= JSON.parse(data['_body']).data.economy_rate_above_9;
       this.strike_rate_60_70= JSON.parse(data['_body']).data.strike_rate_60_70;
       this.strike_rate_50_60= JSON.parse(data['_body']).data.strike_rate_50_60;
       this.strike_rate_below_50= JSON.parse(data['_body']).data.strike_rate_below_50;
        console.log(JSON.parse(data['_body']).data);








       });







    console.log('ionViewDidLoad OdiPage');

  }

}
