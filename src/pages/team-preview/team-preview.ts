import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,App,ViewController } from 'ionic-angular';
import { Http, Headers ,RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';
/**
 * Generated class for the TeamPreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-preview',
  templateUrl: 'team-preview.html',
})
export class TeamPreviewPage {
Match_Uniqueid:any;
 MatchId='MatchId';
 glo_user_token='glo_user_token';
 glo_user_token_v:any;
 baseurl:any;
 team_id:any;
 team_1:any;
 team_2:any;
 batsman:any;
 wk_keeper:any;
 all_rounder:any;
 bowler:any;
 team_no:any;
 batsman_cre:any;
 batsman_image:any;
 bowler_cre:any;
 bowler_image:any;
 all_rounder_cre:any;
 all_rounder_image:any;
 wk_keeper_cre:any;
 wk_keeper_image:any;
 site_url:any;
 bats_pts:any;
 bow_pts:any;
 wk_pts:any;
 ar_pts:any;
 cap_name:any;
 vcap_name:any;
 wk_team_name:any;
 ar_team_name:any;
 bat_team_name:any;
 bow_team_name:any;
 
 
  constructor(public view: ViewController,public navCtrl: NavController,  public http: Http,public navParams: NavParams,) {
	  this.baseurl=localStorage.getItem('global_baseurl');
	 this.team_id=navParams.get('data');
	 this.team_1=navParams.get('teams_1');
	 this.team_2=navParams.get('teams_2');
  }

  closeModal()
  {
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('team1__'+this.team_1);
    console.log('team2__'+this.team_2);
	
	//this.team_id= localStorage.setItem('team_pre_team_id');
	this.Match_Uniqueid= localStorage.getItem(this.MatchId);
 this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
 
		    
		 var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
   const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
             "match_id": this.Match_Uniqueid,
             "team_id": this.team_id,
           
    }
 
    this.http.post(this.baseurl+"team_preview", postData, requestOptions)
      .subscribe(data => {
		 // console.log(JSON.parse(data['_body']).data.batsman[0].name);
		  this.team_no=JSON.parse(data['_body']).data.team_no; 
		  this.batsman=JSON.parse(data['_body']).data.batsman[0].name;
		  this.batsman_cre=JSON.parse(data['_body']).data.batsman[0].credit;
		  this.batsman_image=JSON.parse(data['_body']).data.batsman[0].player_image;
		  this.bowler=JSON.parse(data['_body']).data.bowler[0].name;
		  this.bowler_cre=JSON.parse(data['_body']).data.bowler[0].credit;
		  this.bowler_image=JSON.parse(data['_body']).data.bowler[0].player_image;
		  this.all_rounder=JSON.parse(data['_body']).data.all_rounder[0].name;
		  this.all_rounder_cre=JSON.parse(data['_body']).data.all_rounder[0].credit;
		  this.all_rounder_image=JSON.parse(data['_body']).data.all_rounder[0].player_image;
		  this.wk_keeper=JSON.parse(data['_body']).data.wicket_keeper[0].name;
		  this.wk_keeper_cre=JSON.parse(data['_body']).data.wicket_keeper[0].credit;
		  this.wk_keeper_image=JSON.parse(data['_body']).data.wicket_keeper[0].player_image;
		  this.bats_pts=JSON.parse(data['_body']).data.batsman[0].mypts;
		  this.bow_pts=JSON.parse(data['_body']).data.bowler[0].mypts;
		  this.ar_pts=JSON.parse(data['_body']).data.all_rounder[0].mypts;
		  this.wk_pts=JSON.parse(data['_body']).data.wicket_keeper[0].mypts;
		  this.site_url=JSON.parse(data['_body']).data.site_url;
		  this.cap_name=JSON.parse(data['_body']).data.captain;
		  this.vcap_name=JSON.parse(data['_body']).data.vice_captain;
		  this.wk_team_name=JSON.parse(data['_body']).data.wicket_keeper[0].team_name;
		  this.ar_team_name=JSON.parse(data['_body']).data.all_rounder[0].team_name;
		  this.bat_team_name=JSON.parse(data['_body']).data.batsman[0].team_name;
		  this.bow_team_name=JSON.parse(data['_body']).data.bowler[0].team_name;
		  console.log('player__'+this.wk_keeper_image);
		  
	  });
  }

}
