import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Http, Headers,RequestOptions} from '@angular/http';
import { EditPlayerPage } from '../edit-player/edit-player';
/**
 * Generated class for the MyteamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myteams',
  templateUrl: 'myteams.html',
})
export class MyteamsPage {
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
 site_name:any;
 show_team_1:any;
 show_team_2:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController, public http: Http) {
 this.baseurl=localStorage.getItem('global_baseurl');
this.site_name=localStorage.getItem('site_name');
this.show_team_1=localStorage.getItem('show_team_1');
this.show_team_2=localStorage.getItem('show_team_2');



 }

  openModal(team_id)
  {
	  
	  let team1=this.show_team_1;
	  let team2=this.show_team_2;
    const myModal = this.modal.create('TeamPreviewPage',{data:team_id,teams_1:team1,teams_2:team2}) ;
    myModal.present();
   }

  ionViewDidLoad() {
	  
    console.log('ionViewDidLoad MyteamsPage');
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
  edit_view(team_id)
  {
	  this.navCtrl.setRoot(EditPlayerPage,{data:team_id});
	  
  }

}
