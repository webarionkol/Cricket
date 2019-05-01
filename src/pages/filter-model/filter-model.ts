import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http, Headers,RequestOptions} from '@angular/http';
import { FilterContestPage } from '../filter-contest/filter-contest';
/**
 * Generated class for the FilterModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-model',
  templateUrl: 'filter-model.html',
})
export class FilterModelPage {
winning:any;
relationship:any;
contectsize:any;
MatchId='MatchId';
 glo_user_token='glo_user_token';
 glo_user_token_v:any;
 site_name:any;
 Match_Uniqueid:any;
 left_contest:any;
 displaycontest:any;
 baseurl:any;
  particular_unique_contest:any;
  user_join_contest :any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public http: Http) {
 this.baseurl=localStorage.getItem('global_baseurl'); 
	this.site_name=localStorage.getItem('site_name');
 }

  closeModal()
  {
    this.view.dismiss();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterModelPage');
	this.winning="all";
	this.relationship="all";
	this.contectsize="all";
  }
  filter()
  {
	  this.Match_Uniqueid= localStorage.getItem(this.MatchId);
	
      console.log("User Loged -------- "+ this.Match_Uniqueid);
	  this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
	  var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
	const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
             "unique": this.Match_Uniqueid,
             "win": this.winning,
             "pay": this.relationship,
             "size": this.contectsize,
         
    }
 
    this.http.post(this.baseurl+"ajax_filter", postData, requestOptions)
      .subscribe(data => {
		  
		
		

			  this.displaycontest = JSON.parse(data['_body']).data.contest;
			  this.left_contest = JSON.parse(data['_body']).data.contest_contestant;
			  this.particular_unique_contest = JSON.parse(data['_body']).data.particular_unique_contest;
			  this.user_join_contest = JSON.parse(data['_body']).data.user_joined_contest;
			   console.log(JSON.parse(data['_body']).data);
		 this.navCtrl.setRoot(FilterContestPage,{displaycontest:this.displaycontest,left_contest:this.left_contest,particular_unique_contest:this.particular_unique_contest,user_join_contest:this.user_join_contest});
		 
		 
	});
	  
	  
  }
	reset_form()
	{
this.winning=null;
this.relationship=null;
this.contectsize=null;
	}	

}
