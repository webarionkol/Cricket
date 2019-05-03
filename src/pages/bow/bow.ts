import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams } from 'ionic-angular';
import { Http, Headers , RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
/**
 * Generated class for the BowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bow',
  templateUrl: 'bow.html',
})
export class BowPage {
displaybw:any[];
players: any;
MatchId='MatchId';
glo_user_token_v:any;  
Match_Uniqueid:any;
glo_user_token='glo_user_token';
players_count='players_count';
bowl_count='bowl_count';
/* team_1_count='team_1_count';
team_2_count='team_2_count'; */
minus=true; 
team1: any;
team2: any;

credit_point_select='credit_point_select';
baseurl:any;
player_url:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public http: Http,public events: Events) {
	 this.baseurl=localStorage.getItem('global_baseurl');    
  }

  ionViewDidLoad() {
		this.team1=localStorage.getItem('player1');
		this.team2=localStorage.getItem('player2');
	  
	  let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/loader.gif" />`
      //duration: 5000
    });
    loading.present();
	this.Match_Uniqueid= localStorage.getItem(this.MatchId);

	
	this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
	  var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
	const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
             "role": "bw",
             "match_id": this.Match_Uniqueid,
         
    }
 
    this.http.post(this.baseurl+"get_players", postData, requestOptions)
      .subscribe(data => {
		  
		 loading.dismiss();
		 this.displaybw = JSON.parse(data['_body']).data;
		 this.player_url = JSON.parse(data['_body']).player_url;
		   for (let i = 0; i < this.displaybw.length; i++) {
        this.displaybw[i].minus = false;
      } 
	  });
  }
  selectedArray :any = [];
  onChange(items,i,cbox){
    let parse_int="1";
	let batsman=parseInt(localStorage.getItem('bat_count'));
	
	let allrounder=parseInt(localStorage.getItem('ar_count'));
	let bowler=parseInt(localStorage.getItem('bowl_count'));
	let wicketkeeper=parseInt(localStorage.getItem('wk_count'));
	let che_val=parseFloat(localStorage.getItem('credit_point_select'))-parseFloat((items[i].credit_point));
	
	if (cbox.checked == true) {
 
	 if(items[i].minus == true && parseInt(localStorage.getItem('players_count')) >=11){
	 items[i]["minus"]=false;
	  alert('only 11 players allowed');
	  cbox.checked=false; 
	  return;
    }
	else if(items[i].minus == true && parseInt(localStorage.getItem('team_1_count')) >=7 && items[i].player_team_name == localStorage.getItem('team_1')){
	  items[i]["minus"]=false;
	  alert('only seven player select same team');
	  cbox.checked=false; 
	  return;
    }
	else if(items[i].minus == true && parseInt(localStorage.getItem('team_2_count')) >=7 && items[i].player_team_name == localStorage.getItem('team_2')){
	  items[i]["minus"]=false;
	  alert('only seven player select same team');
	  cbox.checked=false; 
	  return;
    }
	
	else if(items[i].minus == true && che_val < 0){
	  items[i]["minus"]=false;
	  alert('maximum credit point exist');
	  cbox.checked=false; 
	  return;
    }
	
		else if(items[i].minus == true && allrounder==3 && batsman==2 && bowler==4 && wicketkeeper==1)
		{
			
	  items[i]["minus"]=false;
	  alert('Minimum 3 batsman required');
	  cbox.checked=false; 
	  return;

		}
		
		else if(items[i].minus == true && allrounder==2 && batsman==5 && bowler==3 && wicketkeeper==0)
		{
			
			
			items[i]["minus"]=false;
	  alert('Atleast 1 wicket keeper required');
	  cbox.checked=false; 
	  return;

		}
		
		else if(items[i].minus == true && allrounder==0 && batsman==5 && bowler==4 && wicketkeeper==1)
		{
			
          items[i]["minus"]=false;
	  alert('Atleast 1 Allrounder required');
	  cbox.checked=false; 
	  return;
		}
		
		else if(items[i].minus == true && allrounder==2 && batsman==2 && bowler==5 && wicketkeeper==1)
		{
			
			items[i]["minus"]=false;
	  alert('Minimum 3 batsman required');
	  cbox.checked=false; 
	  return;
			 

		}
		else if(items[i].minus == true && allrounder==2 && batsman==0 && bowler==5 && wicketkeeper==1)
		{
			 items[i]["minus"]=false;
	  alert('Minimum 3 batsman required');
	  cbox.checked=false; 
	  return;

		}
		else if(items[i].minus == true && allrounder==3 && batsman==0 && bowler==4 && wicketkeeper==1)
		{
			 items[i]["minus"]=false;
	  alert('Minimum 3 batsman required');
	  cbox.checked=false; 
	  return;

		}
		else if(items[i].minus == true && allrounder==3 && batsman==5 && bowler==2 && wicketkeeper==0)
		{
			 items[i]["minus"]=false;
	  alert('maximum 1 Wicket Keeper');
	  cbox.checked=false; 
	  return;
		}
		else if(items[i].minus == true && allrounder==3 && batsman==2 && bowler==4 && wicketkeeper==1)
		{
			 items[i]["minus"]=false;
	  alert('Minimum 3 batsman required');
	  cbox.checked=false; 
	  return;

		}
		else if(items[i].minus == true && allrounder==3 && batsman==1 && bowler==4 && wicketkeeper==1)
		{
			 items[i]["minus"]=false;
	  alert('Minimum 3 batsman required');
	  cbox.checked=false; 
	  return;

		}
		else if(items[i].minus == true && allrounder==1 && batsman==4 && bowler==5 && wicketkeeper==0)
		{
			
			
			 items[i]["minus"]=false;
	  alert('Atleast 1 wicket keeper required');
	  cbox.checked=false; 
	  return;

		}
		else if(items[i].minus == true && allrounder==1 && batsman==5 && bowler==4 && wicketkeeper==0)
		{
			
			 items[i]["minus"]=false;
	  alert('Atleast 1 wicket keeper required');
	  cbox.checked=false; 
	  return;

		}
		else if(items[i].minus == true && allrounder==3 && batsman==4 && bowler==3 && wicketkeeper==0)
		{
			
			 items[i]["minus"]=false;
	  alert('Atleast 1 wicket keeper required');
	  cbox.checked=false; 
	  return;

		}
		else if(items[i].minus == true && allrounder==2 && batsman==4 && bowler==4 && wicketkeeper==0)
		{
			
			 items[i]["minus"]=false;
	  alert('Atleast 1 wicket keeper required');
	  cbox.checked=false; 
	  return;

		}
		else if(items[i].minus == true && allrounder==3 && batsman==3 && bowler==4 && wicketkeeper==0)
		{
			
			 items[i]["minus"]=false;
	  alert('Atleast 1 wicket keeper required');
	  cbox.checked=false; 
	  return;

		}
		else if(items[i].minus == true && allrounder==3 && batsman==4 && bowler==3 && wicketkeeper==0)
		{
			
			 items[i]["minus"]=false;
	  alert('Atleast 1 wicket keeper required');
	  cbox.checked=false; 
	  return;

		}
		else if(items[i].minus == true && bowler >= 5){
	  items[i]["minus"]=false;
	  alert('maximum 5 bowler ');
	   localStorage.setItem('error_check_bat','error');
	   cbox.checked=false; 
	  return;
    } 
	}
     if(items[i].minus == true){
        //isChecked = true;
       this.minus=true; 
       this.selectedArray.push(items[i]);
		
		
		 //this.players++;
		 //total player count
	  this.players=parseInt(localStorage.getItem('players_count'))+parseInt(parse_int);
	  localStorage.setItem('players_count',this.players);
	  //Wk count
	  this.players=parseInt(localStorage.getItem('bowl_count'))+parseInt(parse_int);
	  localStorage.setItem('bowl_count',this.players);
	  //team1 count
	  if(items[i].player_team_name == localStorage.getItem('team_1'))
	  {
	  this.players=parseInt(localStorage.getItem('team_1_count'))+parseInt(parse_int);
	  localStorage.setItem('team_1_count',this.players);
	  }
	  else if(items[i].player_team_name == localStorage.getItem('team_2'))
	  {
		  let team_2_count=localStorage.getItem('team_2_count');
		this.players=parseInt(team_2_count)+parseInt(parse_int);
	  localStorage.setItem('team_2_count',this.players);  
	  }
	  this.events.publish('user:players_count');
	  let test=localStorage.getItem('credit_point_select');
	 this.players=parseFloat(test)-parseFloat(items[i].credit_point);
		 localStorage.setItem('credit_point_select',this.players);
		this.events.publish('user:login');
		
			
		}
   
   else {
	  
	  this.minus=false; 
      
	  //this.players--;
	  
	   let testing_sara= this.selectedArray.some(e => e.player_id === items[i].player_id);
   if(items[i].minus == false && testing_sara==true) {
	   
    this.players=parseInt(localStorage.getItem('players_count'))-parseInt(parse_int);
	localStorage.setItem('players_count',this.players);
	 //Wk count
	  this.players=parseInt(localStorage.getItem('bowl_count'))-parseInt(parse_int);
	  localStorage.setItem('bowl_count',this.players);
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
   }

 localStorage.setItem('bow_list',JSON.stringify(this.selectedArray));
 
  }

}
