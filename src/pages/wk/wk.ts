import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http, Headers , RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';

//import { SelectPlayerPage } from '../select-player/select-player';
/**
 * Generated class for the WkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wk',
  templateUrl: 'wk.html',
})



export class WkPage {
displaywk:any[];
players: any;
MatchId='MatchId';
Match_Uniqueid:any;
glo_user_token_v:any;
glo_user_token='glo_user_token';
credit_point_select:'credit_point_select';
players_count='players_count';
wk_count='wk_count';
/* team_1_count='team_1_count';
team_2_count='team_2_count'; */
minus=true;

team_1='team_1';
team_2='team_2'; 
checked:boolean;
baseurl:any;
player_url:any;
	team1: any;
	team2: any;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public events: Events, public navParams: NavParams,public alertCtrl:AlertController,public http: Http) {
		this.team1=localStorage.getItem('player1');
		this.team2=localStorage.getItem('player2');
	this.baseurl=localStorage.getItem('global_baseurl'); 
	/* this.items = [
      { name: 'amr mohy', avatar: 'assets/imgs/wk_icon.png'  }, 
      { name: 'ahmed yousef', avatar: 'assets/imgs/wk_icon.png'  }   
      ];

      for (let i = 0; i < this.items.length; i++) {
        this.items[i].checkBox = false;
      } */
  }
   

  ionViewDidLoad() {
	  
	  
	  
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/loader.gif" />`
      //duration: 5000
    });
    loading.present();
	
	
	this.Match_Uniqueid= localStorage.getItem(this.MatchId);
	console.log("User Loged -------- "+ this.Match_Uniqueid);
	
	this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
		   
		 var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
	const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
             "role": "wk",
             "match_id": this.Match_Uniqueid,
         
    }
 
    this.http.post(this.baseurl+"get_players", postData, requestOptions)
      .subscribe(data => {
		  
		   
		 this.displaywk = JSON.parse(data['_body']).data; 
		 this.player_url = JSON.parse(data['_body']).player_url; 
		localStorage.setItem('player_url',this.player_url);
		
		 for (let i = 0; i < this.displaywk.length; i++) {
        this.displaywk[i].minus = false;
      } 
		 loading.dismiss();
	  });
  }

  openalert(){
    let alert = this.alertCtrl.create({
      title: 'Alert! ',
      subTitle: "Something went Wrong",
      // cssClass: 'alertCustomCss',
      // buttons: ['Okay']
       buttons: [
 {
   text: 'Okay',
   role: 'Okay',
   handler: data => {
   
   }
 }
]
      });
      alert.present();  

  }


selectedArray :any = [];

  onChange(items,i,cbox){
	  let parse_int="1";
	 //console.log(JSON.stringify(this.selectedArray));
	
	
	
	
 if (cbox.checked == true) {
  
	 if(items[i].minus == true && parseInt(localStorage.getItem('wk_count')) == 1 && cbox.checked===true){
		 
		 
		 cbox.checked=false;   
 localStorage.setItem('error_check','error');
  items[i].minus=false;
	  alert('maximum one wikect keeper');
	 return;
    }
	
	if(items[i].minus == true && parseInt(localStorage.getItem('players_count')) >= 11){
	localStorage.setItem('error_check','error');
	items[i]["minus"]=false;
	  cbox.checked=false; 
	  alert('only 11 players allowed');
	  return;
    }
	if(items[i].minus == true && parseInt(localStorage.getItem('team_1_count')) >= 6 && items[i].player_team_name == localStorage.getItem('team_1')){
	 localStorage.setItem('error_check','error'); 
	  items[i]["minus"]=false;
	   cbox.checked=false; 
	  alert('only seven player select same team');
	  return;
    }
	if(items[i].minus == true && parseInt(localStorage.getItem('team_2_count')) >= 6 && items[i].player_team_name == localStorage.getItem('team_2')){
	  localStorage.setItem('error_check','error');
	  items[i]["minus"]=false;
	   cbox.checked=false; 
	  alert('only seven player select same team');
	  return;
    }
	let che_val=parseFloat(localStorage.getItem('credit_point_select'))-parseFloat((items[i].credit_point));
	
	if(items[i].minus == true && che_val < 0){
	 localStorage.setItem('error_check','error');
	 items[i]["minus"]=false;
	  alert('maximum credit point exist');
	  return;
    }
	 
     if(items[i].minus == true && parseInt(localStorage.getItem('wk_count')) == 0){
       this.selectedArray.push(items[i]);
       this.minus=true; 
        
		
	 this.players=parseInt(localStorage.getItem('players_count'))+parseInt(parse_int);
	  localStorage.setItem('players_count',this.players);
	  //Wk count
	 this.players=parseInt(localStorage.getItem('wk_count'))+parseInt(parse_int);
	  localStorage.setItem('wk_count',this.players);
	  //team1 count
	  if(items[i].player_team_name == localStorage.getItem('team_1'))
	  {
	 this.players=parseInt(localStorage.getItem('team_1_count'))+parseInt(parse_int);
	  localStorage.setItem('team_1_count',this.players);
	  }
	  else if(items[i].player_team_name == localStorage.getItem('team_2'))
	  {
		 this.players=parseInt(localStorage.getItem('team_2_count'))+parseInt(parse_int);
	  localStorage.setItem('team_2_count',this.players);  
	  }
	  this.events.publish('user:players_count');
	  
	  this.players=parseFloat(localStorage.getItem('credit_point_select'))-parseFloat(items[i].credit_point);
		 localStorage.setItem('credit_point_select',this.players);
		this.events.publish('user:login');
		
			
		}
  } 
  else 
  {  
	 console.log(this.selectedArray.some(e => e.player_id === items[i].player_id)); 
 /*  this.selectedArray.some(function(el) { */
	/*   console.log(el.player_id);
	  console.log(items[i].player_id); */
	  
	/* if(el.player_id==items[i].player_id)
	{ */
  
  
  
 
	  
   /* let newArray1 = this.selectedArray.filter(function(el) { */
    
   let testing_sara= this.selectedArray.some(e => e.player_id === items[i].player_id);
   if(items[i].minus == false && testing_sara==true) { 
	    console.log(items[i].minus);
	  console.log('stop-----------');
	  //this.minus=false; 
      
	  if(localStorage.getItem('edit_captain')==items[i].player_id)
	  {
		 localStorage.setItem('edit_captain',''); 
	  } 
	  if(localStorage.getItem('edit_vice')==items[i].player_id)
	  {
		   localStorage.setItem('edit_vice',''); 
	  }
	  
	  
		//this.players--;
    this.players=parseInt(localStorage.getItem('players_count'))-parseInt(parse_int);
	localStorage.setItem('players_count',this.players);
	 //Wk count
	  this.players=parseInt(localStorage.getItem('wk_count'))-parseInt(parse_int);
	  localStorage.setItem('wk_count',this.players);
	 //team1 count
	  if(items[i].player_team_name == localStorage.getItem('team_1'))
	  {
	  this.players=parseInt(localStorage.getItem('team_1_count'))-parseInt(parse_int);
	  localStorage.setItem('team_1_count',this.players);
	  }
	  else if(items[i].player_team_name == localStorage.getItem('team_2'))
	  {
		this.players=parseInt(localStorage.getItem('team_2_count'))-parseInt(parse_int);
	  localStorage.setItem('team_2_count',this.players);  
	  }
	this.events.publish('user:players_count');
	
  this.players=parseFloat(localStorage.getItem('credit_point_select'))+parseFloat((items[i].credit_point));
		 localStorage.setItem('credit_point_select',this.players);
		
		 this.events.publish('user:login');
		 
	let newArray=this.selectedArray.filter(function(el) {
 return el.player_id !== items[i].player_id;

 
 });
 this.selectedArray = newArray;
     }   
   
 /* }
 return true;
 // return el.player_id !== items[i].player_id;

 
 }); */
   

 
  }  
	  
	  
	  
	// this.selectedArray = newArray; 


	 // console.log(JSON.stringify(this.selectedArray));
 
 
    localStorage.setItem('wk_list',JSON.stringify(this.selectedArray));
    
  
console.log(localStorage.getItem('wk_list')); 
  }
  

}
