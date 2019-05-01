import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the PlaypointsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playpoints',
  templateUrl: 'playpoints.html',
})
export class PlaypointsPage {

  matchid:any;
  scores:any;
  playernames:any;
  teamname:any;
  glo_user_token_v:any;
  glo_user_token='glo_user_token';
  baseurl:any;
player_url:any;
player_image:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {

    this.baseurl=localStorage.getItem('global_baseurl');
    this.matchid=navParams.get('match_id');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PlaypointsPage');
   
this.player_url=localStorage.getItem('player_url');

   this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
    headers.append("Accept", 'application/json');

    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });

    let postData={
      "match_id": this.matchid,

    }

    this.http.post(this.baseurl+"player_data",postData ,requestOptions)
    .subscribe(data => {


      if(JSON.parse(data['_body']).status=='success')
      {
        console.log(JSON.parse(data['_body']).data);

        this.scores=JSON.parse(data['_body']).data.player_points;
        this.playernames=JSON.parse(data['_body']).data.player;
        this.teamname=JSON.parse(data['_body']).data.team_name;
        this.player_image=JSON.parse(data['_body']).data.player_id;
		//console.log('palyer__'+this.player_image);

      }

    });




  }

}
