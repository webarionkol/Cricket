import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,App} from 'ionic-angular';
import { Http, Headers,RequestOptions} from '@angular/http';
import { SelectPlayerPage } from '../select-player/select-player';
import { SelectTeamPage } from '../select-team/select-team';
import { MyteamsPage } from '../myteams/myteams';
import { MatchResultPage } from '../match-result/match-result';
/**
 * Generated class for the FilterContestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-contest',
  templateUrl: 'filter-contest.html',
})
export class FilterContestPage {
MatchId='MatchId';
 glo_user_token='glo_user_token';
 glo_user_token_v:any;
 site_name:any;
 Match_Uniqueid:any;
 left_contest:any;
 displaycontest:any;
 baseurl:any;
 user_detail:any;
  particular_unique_contest:any;
  user_join_contest :any;
  show_team_1 :any;
  show_team_2 :any;
  user_team_count :any; 
   constructor(public navCtrl: NavController, public app:App,public navParams: NavParams, public http: Http, public modal: ModalController) {
	this.displaycontest=navParams.get('displaycontest');
	this.left_contest=navParams.get('left_contest');
	this.particular_unique_contest=navParams.get('particular_unique_contest');
	this.user_join_contest=navParams.get('user_join_contest');
	this.baseurl=localStorage.getItem('global_baseurl'); 
	this.site_name=localStorage.getItem('site_name');
	this.show_team_1=localStorage.getItem('show_team_1');
		 this.show_team_2=localStorage.getItem('show_team_2');
		 this.user_team_count=localStorage.getItem('user_team_count');
		 console.log(this.user_team_count);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterContestPage');
	
	 console.log("User Loged -------- "+ this.Match_Uniqueid);
	  this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
	  var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
	const requestOptions = new RequestOptions({ headers: headers });
		   
		let postData1 = {
            
             "match_id": this.Match_Uniqueid,
         
    }
	  
		
		  this.http.post(this.baseurl+"get-details", postData1, requestOptions)
      .subscribe(data => {
		  
		   
		console.log(JSON.parse(data['_body']).success.credit_point); 
		this.user_detail=parseInt(JSON.parse(data['_body']).success.credit_point); 
		
	  });
	 
	 
	
  }
  
  openModal()
  {
    const myModal = this.modal.create('FilterModelPage') ;
    myModal.present();
   }
    
   openRank(contest)
{
	
  const myModal = this.modal.create('RankDetailsPage',{data:contest.id});
  myModal.present();
  
  
 } 
  Goto_selectplayer(){this.navCtrl.setRoot(SelectPlayerPage);}
  Goto_selectteampage(contest)
  {
	  
	  this.navCtrl.setRoot(SelectTeamPage,{data:contest.id});
	  
	}
  full_contest(){
	  alert('contest All Ready Full');
	  }
	  playpoint_purchase(){
	  alert('Your Play Point is please purchase first');
	  }
	  
	    Goto_viewteam()
     {
	  
	  this.navCtrl.setRoot(MyteamsPage);
	  
	}
	my_contest() 
	{
	
			let uni_id=this.Match_Uniqueid;
	this.app.getRootNavs()[0].push(MatchResultPage,{uni_matchid:uni_id} );
	
	}

}
