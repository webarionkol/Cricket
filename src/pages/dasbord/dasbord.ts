import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController,LoadingController,Slides, App, ModalController } from 'ionic-angular';
import { ContestPage } from '../contest/contest';
import { Http, Headers ,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {LoginPage} from '../login/login';

/**
 * Generated class for the DasbordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dasbord',
  templateUrl: 'dasbord.html',
})
export class DasbordPage {

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;
  
    SwipedTabsIndicator :any= null;
  tabs:any=[];
  displaymatch:any=[];
  arr = [];
  matchlist = [];
  displaycontest = [];
 MatchId='MatchId';
 glo_user_token='glo_user_token';
glo_user_token_v:any;
baseurl:any;
site_name:any;
site_url:any;
banner_url:any;
banner_1:any;
banner_2:any;
banner_3:any;

public times_clear:any;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public app: App, public modal: ModalController, public http: Http) {
    this.tabs=["Cricket","Football"];
	// console.log('Hello CategoriesServiceProvider Provider');
this.baseurl=localStorage.getItem('global_baseurl');
this.site_name=localStorage.getItem('site_name');
	
  }
  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
	
	
	
  }

  selectTab(index) {    
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
      // this condition is to avoid passing to incorrect index
  	if( this.SwipedTabsSlider.length()> this.SwipedTabsSlider.getActiveIndex())
  	{
  		this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedTabsSlider.getActiveIndex() * 100)+'%,0,0)';
  	}
    
    }

  animateIndicator($event) {
  	if(this.SwipedTabsIndicator)
   	    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSlider.length()-1))*100) + '%,0,0)';
  }
 
 Goto_contest(match,intervals){
   
    
	//console.log('manda---'+match.unique_id);
	let match_id=match.unique_id;
localStorage.setItem(this.MatchId,match_id);
//intervals.forEach(clearInterval);
  
  
  
  this.app.getRootNavs()[0].push(ContestPage,{data:match.unique_id});
  //this.navCtrl.setRoot(ContestPage,{data:match.unique_id})
}

openModal()
{
  const myModal = this.modal.create('ContestModelPage') ;
  myModal.present();
  
  
 }
 
ionViewDidLoad() {
	
  let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/loader.gif" />`
      //duration: 5000
    });
    loading.present();
  
		
		 this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
		 
		 

		
		  
		 
		  //console.log(this.glo_user_token_v);
		    
		 var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
   const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
             "name": "Customer004",
            "email": "customer004@email.com",
            "tel": "0000252525" 
    }
 
    this.http.post(this.baseurl+"get-matches", postData, requestOptions)
      .subscribe(data => {
     
		  loading.dismiss();

			 var displaymatch = JSON.parse(data['_body']).data;
			 this.site_url= JSON.parse(data['_body']).url; 
			 this.banner_url= JSON.parse(data['_body']).banner.banner_url; 
			 this.banner_1= JSON.parse(data['_body']).banner.banner1; 
			 this.banner_2= JSON.parse(data['_body']).banner.banner2; 
			 this.banner_3= JSON.parse(data['_body']).banner.banner3; 
			 
	

var arr = [];
var intervals = [];
Object.keys(displaymatch).forEach(function(key)
{
    arr.push(displaymatch[key]);
	
	 let countDownDate = new Date(displaymatch[key].app_date_time).getTime();

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
  document.getElementById("demo"+displaymatch[key].unique_id).innerHTML = days + "d " + hours + "h "
   + minutes + "m " + seconds + "s ";   
   // + minutes + "m " + seconds + "s ";   
	   
	  //console.log( document.getElementById("demo"+displaymatch[key].unique_id).innerHTML = days + "d " + hours + "h "
      // + minutes + "m " + seconds + "s "); 
		//this.displaymatch[key].minus = false;
      // If the count down is over, write some text 
      if (distance < 0) { 
        clearInterval(x);  
   document.getElementById("demo"+displaymatch[key].unique_id).innerHTML = "EXPIRED";  
 //document.getElementById("demo"+displaymatch[key].unique_id).innerHTML = "EXPIRED"; 
      // let times ="EXPIRED"; 
	  //this.displaymatch[key].minus = true;
       }
     }, 1000); 
	 intervals.push(x);
});
this.times_clear=intervals;
this.matchlist = arr;



//localStorage.setItem('times_clear123',intervals);
  

      },(err)=>{
		    loading.dismiss();
	 
	 this.navCtrl.setRoot(LoginPage)
	  
	  
	  });
  
}

}
