import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,App } from 'ionic-angular';
import { Http, Headers,RequestOptions} from '@angular/http';
import { ContestPage } from '../contest/contest';
import { SelectPlayerPage } from '../select-player/select-player';
import 'rxjs/add/operator/map';
/**
 * Generated class for the SelectTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-team',
  templateUrl: 'select-team.html',
})
export class SelectTeamPage {
 Match_Uniqueid:any;
 MatchId='MatchId';
 glo_user_token='glo_user_token';
 glo_user_token_v:any;
 baseurl:any;
 captain_player:any;
 v_captain_player:any;
 team_no:any;
 team_id:any;
 contest_id:any;
 relationship:any;
 site_name:any;
 show_team_1:any;
 show_team_2:any;
  constructor(public navCtrl: NavController,  public app: App,public navParams: NavParams, private modal: ModalController, public http: Http) {
 this.baseurl=localStorage.getItem('global_baseurl');
this.contest_id=navParams.get('data'); 
this.site_name=localStorage.getItem('site_name');
this.show_team_1=localStorage.getItem('show_team_1');
		 this.show_team_2=localStorage.getItem('show_team_2');
 }
ionViewDidLoad() {
	this.Match_Uniqueid= localStorage.getItem(this.MatchId);
	
	
      console.log("User Loged -------- "+ this.Match_Uniqueid);
	  this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
	  var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
	const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
             "match_id": this.Match_Uniqueid,
             
         
    }
 
    this.http.post(this.baseurl+"contest_team", postData, requestOptions)
      .subscribe(data => {
		  
			   console.log(JSON.parse(data['_body']).data);
		 this.captain_player=JSON.parse(data['_body']).data.captain_player;
		 this.v_captain_player=JSON.parse(data['_body']).data.v_captain_player;
		 this.team_no=JSON.parse(data['_body']).data.team_no;
		 this.team_id=JSON.parse(data['_body']).data.team_id;
	});
}

joincontst_submit()
{
	
	console.log("User Loged -------- "+ this.Match_Uniqueid);
	  this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
	  var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
	const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
             "matchid": this.Match_Uniqueid,
             "contestid": this.contest_id,
             "teamid": this.relationship,
    }
 
    this.http.post(this.baseurl+"user_join_contest", postData, requestOptions)
      .subscribe(data => {
		  
			   console.log(JSON.parse(data['_body']).success);
			   alert(JSON.parse(data['_body']).success);
		 this.app.getRootNavs()[0].push(ContestPage,{data:this.MatchId});
	});
	
}

  openModal(team_id)
  {
	  //localStorage.setItem('team_pre_team_id',team_id);
	 let team1=this.show_team_1;
	 let team2=this.show_team_2;
    const myModal = this.modal.create('TeamPreviewPage',{data:team_id,teams_1:team1,teams_2:team2}) ;
    myModal.present();
    
   }
Goto_selectplayer(){this.navCtrl.setRoot(SelectPlayerPage);}
  

}
