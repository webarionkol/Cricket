import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, App, ModalController } from 'ionic-angular';
import { PlaypointsPage } from '../playpoints/playpoints';
import { Http, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


/**
 * Generated class for the LeaderboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {
  matchid:any;
  contestid:any;
  glo_user_token_v:any;
  glo_user_token='glo_user_token';
  scores=[];
  contests:any;
  con_details:any;
baseurl:any;
no_winner:any;
winning_pirze:any;
is_practise_contest:any;
con_name:any;
m_status:any;
match_started:any;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,public http:Http ,public app: App, private modal: ModalController) {
    this.matchid=navParams.get('match');
    this.contestid=navParams.get('contest_id');
    this.m_status=navParams.get('status_msg');
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
      "match_id": this.matchid,
      "contest_id": this.contestid

    }
    //console.log('post____'+JSON.stringify(postData));

    this.http.post(this.baseurl+"leader_board",postData ,requestOptions)
    .subscribe(data => {


       

      this.scores = JSON.parse(data['_body']).data;
     this.contests = JSON.parse(data['_body']).data.contests;
     this.match_started = JSON.parse(data['_body']).data.match_start;
    
	
    });

 let postData1={
     
      "contest_id": this.contestid

    }
 this.http.post(this.baseurl+"single_contest",postData1 ,requestOptions)
    .subscribe(data => {
 this.con_details = JSON.parse(data['_body']).data;
 this.con_name = JSON.parse(data['_body']).data.name;
 this.is_practise_contest = JSON.parse(data['_body']).data.is_practise_contest;
 this.winning_pirze = JSON.parse(data['_body']).data.winning_pirze;
 this.no_winner = JSON.parse(data['_body']).data.no_winner;
 loading.dismiss();

	});

  }
 openRank(contest)
{
	
  const myModal = this.modal.create('RankDetailsPage',{data:contest.id});
  myModal.present();
  
  
 } 
  Goto_playpoint()
  {
	  let matchid= this.matchid;
    this.app.getRootNavs()[0].push(PlaypointsPage,{match_id:matchid});
  }

  openModal()
  {
    const myModal = this.modal.create('TeamViewPage') ;
    myModal.present();
   }
preview(contest,team_1,team_2)
   {
   let team_id=contest.id;
   let team1=team_1;
   let team2=team_2;
   
   const myModal = this.modal.create('TeamPreviewPage',{data:team_id,teams_1:team1,teams_2:team2});
    myModal.present();
   
   }
}
