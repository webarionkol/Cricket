import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams, ModalController,App } from 'ionic-angular';
import { SelectPlayerPage } from '../select-player/select-player';
import { SelectTeamPage } from '../select-team/select-team';
import { MyteamsPage } from '../myteams/myteams';
import { MatchResultPage } from '../match-result/match-result';
import { Http, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the ContestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contest',
  templateUrl: 'contest.html',
})
export class ContestPage {
uniqueIDs:any;
displaycontest:any[];
get_contest:any[];
Match_Uniqueid:any;
left_contest:any=[];
 MatchId='MatchId';
 glo_user_token='glo_user_token';
 glo_user_token_v:any;
 user_join_contest:any;
 baseurl:any;
 user_team_count:any;
 particular_unique_contest:any;
 user_detail:any;
 site_name:any;
 show_team_1:any;
 show_team_2:any;
 hide:boolean=true;
 team1get: any;
 team2get : any;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams, public modal: ModalController, public http: Http,public app:App) {
	this.baseurl=localStorage.getItem('global_baseurl'); 
	this.site_name=localStorage.getItem('site_name');
	this.team1get=this.navParams.get('team1') 
	this.team2get=this.navParams.get('team2')	 

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
  
  ionViewDidLoad() {
	  
	   let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/loader.gif" />`
      //duration: 5000
    });
    loading.present();
	  
	  this.Match_Uniqueid= localStorage.getItem(this.MatchId);
	
      //console.log("User Loged -------- "+ this.Match_Uniqueid);
	  this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
	  var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
	const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
             "input_field": this.Match_Uniqueid,
         
    }
 
    this.http.post(this.baseurl+"contest_post", postData, requestOptions)
      .subscribe(data => {
		  
		
		

			  this.displaycontest = JSON.parse(data['_body']).data.contest;
			  this.left_contest = JSON.parse(data['_body']).data.contest_contestant;
			  this.particular_unique_contest = JSON.parse(data['_body']).data.particular_unique_contest;
			  this.user_join_contest = JSON.parse(data['_body']).data.user_joined_contest;
			  
			  
			  if(this.user_join_contest!=0)
			  {
			  this.hide=false;
			  }
			  // console.log(JSON.parse(data['_body']).data);
		 
	});
	let postData1 = {
            
             "match_id": this.Match_Uniqueid,
         
    }
	  
	   this.http.post(this.baseurl+"user_team_count", postData1, requestOptions)
      .subscribe(data => {
		  
		   
		 localStorage.setItem('user_team_count',JSON.parse(data['_body']).data); 
		this.user_team_count=localStorage.getItem('user_team_count');
		 
	  });  
	 
	 this.http.post(this.baseurl+"get-details", postData1, requestOptions)
      .subscribe(data => {
		  
		   
	//	console.log(JSON.parse(data['_body']).success.credit_point); 
		this.user_detail=parseInt(JSON.parse(data['_body']).success.credit_point); 
		
		 
	  });  
	    let postData2 = {
            
             "match_id": this.Match_Uniqueid,
         
    }
 
    this.http.post(this.baseurl+"single_match", postData2, requestOptions)
      .subscribe(data => {
		  
		    loading.dismiss();
		 localStorage.setItem('show_team_1',JSON.parse(data['_body']).data.team_1); 
		 localStorage.setItem('show_team_2',JSON.parse(data['_body']).data.team_2); 
		 
		 this.show_team_1=localStorage.getItem('show_team_1');
		 this.show_team_2=localStorage.getItem('show_team_2');
		
		 
	  });  
  }
  Goto_selectplayer(){
		localStorage.setItem("player1",this.team1get)
	  localStorage.setItem("player2",this.team2get)
	  this.navCtrl.setRoot(SelectPlayerPage,{pla1:this.team1get,pla2:this.team2get});
	  
	  
}
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
	  
	 // this.navCtrl.setRoot(MyteamsPage);
	 this.navCtrl.push(MyteamsPage);
	  
	}
	my_contest(mstatus)
	{
	
			let uni_id=this.Match_Uniqueid;
	this.app.getRootNavs()[0].push(MatchResultPage,{uni_matchid:uni_id,match_status:mstatus} );
	
	}
	
	
}

