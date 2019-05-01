import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditselectCaptainPage } from '../editselect-captain/editselect-captain';
import { Events } from 'ionic-angular';
import { Http, Headers , RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the EditPlayerPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-player',
  templateUrl: 'edit-player.html'
})
export class EditPlayerPage {

	 editWkRoot = 'EditWkPage'
  editBatRoot = 'EditBatPage'
  editArRoot = 'EditArPage'
  editBowRoot = 'EditBowPage'  
 
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
team_id:any; 
selectedArray :any = [];
displaywk :any[];
minus=true;

  constructor(public navCtrl: NavController,public events: Events,public navParams: NavParams,public http: Http) {
	 this.baseurl=localStorage.getItem('global_baseurl'); 
this.site_name=localStorage.getItem('site_name');
this.team_id=navParams.get('data');
localStorage.setItem('edit_team_id',this.team_id);
	 
	  events.subscribe('user:edit_login', () => {
  this.Credirfunction();
});
events.subscribe('user:edit_players_count', () => {
  this.playerscount();
});
	localStorage.setItem('edit_credit_point_select',this.cps); 
	localStorage.setItem('edit_players_count',this.players_counts); 
	localStorage.setItem('edit_wk_count',this.wk_counts); 
	localStorage.setItem('edit_bat_count',this.bat_counts); 
	localStorage.setItem('edit_ar_count',this.ar_counts); 
	localStorage.setItem('edit_bowl_count',this.bowl_counts); 
	localStorage.setItem('edit_team_1_count',this.team_1_counts); 
	localStorage.setItem('edit_team_2_count',this.team_2_counts); 
	//localStorage.setItem('wk_id',this.wk_id); 
	localStorage.setItem('edit_ar_list',this.ar_list);
	localStorage.setItem('edit_bow_list',this.bow_list);
	localStorage.setItem('edit_wk_list',this.wk_list);
	localStorage.setItem('edit_bat_list',this.bat_list);
	
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
		  
		   
		 localStorage.setItem('edit_team_1',JSON.parse(data['_body']).data.team_1); 
		 localStorage.setItem('edit_team_2',JSON.parse(data['_body']).data.team_2); 
		
		 
	  });  
	    let postData1 = {
            
             "match_id": this.Match_Uniqueid,
             "team_id": this.team_id,
         
    }
 
    this.http.post(this.baseurl+"captain_vice", postData1, requestOptions)
      .subscribe(data => {
		  
		   
		 localStorage.setItem('edit_captain',JSON.parse(data['_body']).data.captain); 
		 localStorage.setItem('edit_vice',JSON.parse(data['_body']).data.vice_captain); 
		 localStorage.setItem('edit_team_no',JSON.parse(data['_body']).data.team_no); 
		
		console.log( localStorage.getItem('edit_team_no')); 
	  });  
	  
	
	
	 
  }
ionViewDidLoad() {
	console.log('test.........................');
	
	this.Match_Uniqueid= localStorage.getItem(this.MatchId);
	console.log("User Loged -------- "+ this.Match_Uniqueid);
	
	this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
		   
		 var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
	const requestOptions = new RequestOptions({ headers: headers });
	
	
}
Credirfunction(){
	this.final_credit=localStorage.getItem('edit_credit_point_select');
	
}
playerscount(){
	this.players_count_var=localStorage.getItem('edit_players_count');
	this.wk_count_var=localStorage.getItem('edit_wk_count');
	this.team_1_count=localStorage.getItem('edit_team_1_count');
	this.team_2_count=localStorage.getItem('edit_team_2_count');
	
	if(this.players_count_var==11)
	{
		this.isenabled=true;
	}
	else 
	{
       this.isenabled=false;		
	}
		

}
Goto_editselectcaptain()
{
	  this.navCtrl.setRoot(EditselectCaptainPage);
	
}
}
