import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { SelectCaptainPage } from '../select-captain/select-captain';
import { Events } from 'ionic-angular';
import { Http, Headers , RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the SelectPlayerPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
  
@IonicPage()
@Component({
  selector: 'page-select-player',
  templateUrl: 'select-player.html'
})    
export class SelectPlayerPage {
 
  wkRoot = 'WkPage' 
  batRoot = 'BatPage'
  arRoot = 'ArPage'
  bowRoot = 'BowPage'
credit_point_select='credit_point_select';
players_count='players_count';
wk_count='wk_count';
 team_1_count:any;
team_2_count:any;
final_credit:any;
glo_user_token_v:any;
players_count_var:any;
wk_count_var:any;
Match_Uniqueid:any;
MatchId='MatchId';
team_1='team_1';    
team_2='team_2';
glo_user_token='glo_user_token'; 
cps="100";
players_counts="0";
ar_counts="0";
wk_counts="0";
bat_counts="0";
bowl_counts="0";
team_1_counts="0";
team_2_counts="0";
ar_list:any;
bow_list:any;
wk_list:any;
bat_list:any;
isenabled:boolean=false;
baseurl:any;
site_name:any;

  constructor(public navCtrl: NavController,public events: Events,public navParams: NavParams,public http: Http) {
	 this.baseurl=localStorage.getItem('global_baseurl'); 
this.site_name=localStorage.getItem('site_name');	 
	  events.subscribe('user:login', () => {
  this.Credirfunction();
});
events.subscribe('user:players_count', () => {
  this.playerscount();
});
	localStorage.setItem('credit_point_select',this.cps); 
	localStorage.setItem('players_count',this.players_counts); 
	localStorage.setItem('wk_count',this.wk_counts); 
	localStorage.setItem('bat_count',this.bat_counts); 
	localStorage.setItem('ar_count',this.ar_counts); 
	localStorage.setItem('bowl_count',this.bowl_counts); 
	localStorage.setItem('team_1_count',this.team_1_counts); 
	localStorage.setItem('team_2_count',this.team_2_counts); 
	//localStorage.setItem('wk_id',this.wk_id); 
	localStorage.setItem('ar_list',this.ar_list);
	localStorage.setItem('bow_list',this.bow_list);
	localStorage.setItem('wk_list',this.wk_list);
	localStorage.setItem('bat_list',this.bat_list);
	
	this.Match_Uniqueid= localStorage.getItem(this.MatchId);
	
	
	this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
	var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
	const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
            
             "match_id": this.Match_Uniqueid,
         
    }
 
    this.http.post(this.baseurl+"single_match", postData, requestOptions)
      .subscribe(data => {
		  
		   
		 localStorage.setItem('team_1',JSON.parse(data['_body']).data.team_1); 
		 localStorage.setItem('team_2',JSON.parse(data['_body']).data.team_2); 
		
		 
	  });  
	  
	 
	  
	 
  }
ionViewDidLoad() {
	
}
Credirfunction(){
	this.final_credit=localStorage.getItem('credit_point_select');
	
}
playerscount(){
	this.players_count_var=localStorage.getItem('players_count');
	this.wk_count_var=localStorage.getItem('wk_count');
	this.team_1_count=localStorage.getItem('team_1_count');
	this.team_2_count=localStorage.getItem('team_2_count');
	
	if(this.players_count_var==11)
	{
		this.isenabled=true;
	}
	else 
	{
       this.isenabled=false;		
	}
		
	
}

  Goto_selectcaptain(){
    
    this.navCtrl.push(SelectCaptainPage);
 }
 

}
