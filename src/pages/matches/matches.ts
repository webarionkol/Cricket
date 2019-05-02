import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, NavParams, App } from 'ionic-angular';
import { MatchResultPage } from '../match-result/match-result';
import { ContestPage } from '../contest/contest';
import { LoginPage } from '../login/login';
import { Http, Headers ,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the MatchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
})
export class MatchesPage {

  glo_user_token_v:any;
  glo_user_token='glo_user_token';
  upcomings:any;
  lives:any;
  results:any;
  site_url:any;
  Match_Uniqueid:any;

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;

    SwipedTabsIndicator :any= null;
  tabs:any=[];
baseurl:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App,public http:Http) {
    this.tabs=["Upcoming","Live","Result"];
	 this.baseurl=localStorage.getItem('global_baseurl');
  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad MatchesPage');

    this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
    headers.append("Accept", 'application/json');

    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });

    let postData={
      "type": "upcoming",

    }

    this.http.post(this.baseurl+"all_matches",postData ,requestOptions)
    .subscribe(data => {
      //console.log(JSON.parse(data['_body']).data);
      this.upcomings = JSON.parse(data['_body']).data.upcoming;
       var displaymatches  = JSON.parse(data['_body']).data.upcoming;
      
    this.lives = JSON.parse(data['_body']).data.live;
    this.results = JSON.parse(data['_body']).data.result;
    this.site_url = JSON.parse(data['_body']).data.site_url;

      console.log(this.lives.length)
     var arr = [];


Object.keys(displaymatches).forEach(function(key)
{
    arr.push(displaymatches[key]);
	
	 let countDownDate = new Date(displaymatches[key].app_date_time).getTime();

    // Update the count down every 1 second
     let x = setInterval(() =>{ 

      // Get todays date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
     // console.log(now, "now", "countDownDate", countDownDate, "distance", distance, "days", days);

      // Output the result in an element with id="demo"
  document.getElementById("demo1"+displaymatches[key].unique_id).innerHTML = days + "d " + hours + "h "
   + minutes + "m " + seconds + "s ";   
   // + minutes + "m " + seconds + "s ";   
	   
	  //console.log( document.getElementById("demo"+displaymatch[key].unique_id).innerHTML = days + "d " + hours + "h "
      // + minutes + "m " + seconds + "s "); 
		//this.displaymatch[key].minus = false;
      // If the count down is over, write some text 
      if (distance < 0) { 
        clearInterval(x); 
 document.getElementById("demo1"+displaymatches[key].unique_id).innerHTML = "EXPIRED";  
 //document.getElementById("demo"+displaymatch[key].unique_id).innerHTML = "EXPIRED"; 
      // let times ="EXPIRED";
	  //this.displaymatch[key].minus = true;
       } 
     }, 1000); 
	
});






    },(err)=>{
		  
	    this.navCtrl.setRoot(LoginPage)
	  
	  
	  });



  }

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
  }

  selectTab(index) {
    console.log(index)
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
    console.log("HI")
      // this condition is to avoid passing to incorrect index
  	if( this.SwipedTabsSlider.length()> this.SwipedTabsSlider.getActiveIndex())
  	{
  		this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedTabsSlider.getActiveIndex() * 100)+'%,0,0)';
  	}

    }

  animateIndicator($event) {
  	if(this.SwipedTabsIndicator){
   	    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSlider.length()-1))*100) + '%,0,0)';
    }
      }

      Goto_matchresult(match_id,mstatus)
      {
      let uni_id=match_id.unique_id;
     // console.log('match__'+mstatus);
	  this.Match_Uniqueid= localStorage.setItem("MatchId",uni_id);
   this.app.getRootNavs()[0].push(MatchResultPage,{uni_matchid:uni_id,match_status:mstatus} );

      }
	  
	  
	  Goto_contest(match){
   
    
	//console.log('manda---'+match.unique_id);
	let match_id=match.unique_id;
localStorage.setItem('MatchId',match_id);
//intervals.forEach(clearInterval);
  
  
  
  this.app.getRootNavs()[0].push(ContestPage);
  //this.navCtrl.setRoot(ContestPage,{data:match.unique_id})
}

}
