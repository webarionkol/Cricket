import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams, App } from 'ionic-angular';
import { PlaypointsPage } from '../playpoints/playpoints';
import { LeaderboardPage } from '../leaderboard/leaderboard';
import { Http, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the MatchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-match-result',
  templateUrl: 'match-result.html',
})
export class MatchResultPage {
  matchid:any;
  glo_user_token_v:any;
  glo_user_token='glo_user_token';
  scores=[];
  contests:any;
  team1:any;
  team2:any;
  m_msg:any;
  m_status:any;
  mstatus:any;
 
baseurl:any;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams, public app: App,public http:Http) {

    this.matchid = navParams.get('uni_matchid');
    this.mstatus = navParams.get('match_status');
    //this.m_msg = navParams.get('msg');
	//console.log('MYMSG___'+this.mstatus);
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

    }

    this.http.post(this.baseurl+"get_data",postData ,requestOptions)
    .subscribe(data => {


    loading.dismiss();



     this.scores = JSON.parse(data['_body']).data;
     this.contests = JSON.parse(data['_body']).data.user_contest;
	

    });




  }

  Goto_playpoint()
  {

    let matchid=this.matchid;
  //  console.log('play__'+matchid);
    this.app.getRootNavs()[0].push(PlaypointsPage,{match_id:matchid});
  }

  Goto_leaderboard(contestid)
  {
      let contest=contestid;
      let matchid=this.matchid;
   // console.log('contest___',+contestid);
   // console.log('contest___',+contestid);
   // console.log('match___',+matchid);
   this.app.getRootNavs()[0].push(LeaderboardPage,{match:matchid,contest_id:contest,status_msg:this.mstatus});
  }


}
