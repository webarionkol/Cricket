import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams } from 'ionic-angular';
import { Http, Headers , RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
/**
 * Generated class for the EditBatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-bat',
  templateUrl: 'edit-bat.html',
})
export class EditBatPage {
displaybat:any[];
MatchId='MatchId';

Match_Uniqueid:any;
players:any;
  glo_user_token_v:any;
glo_user_token='glo_user_token';
credit_point_select='credit_point_select';
players_count='players_count';
bat_count='bat_count';
team_1_count='team_1_count';
team_2_count='team_2_count';
minus=true;
batsman:any;
allround:any;
bowler:any;
wicketkeeper:any;
baseurl:any;
team_id_edit:any;
player_url:any;
   constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public events: Events, public navParams: NavParams,public http: Http) {
  console.log('test');
  this.baseurl=localStorage.getItem('global_baseurl');  
this.team_id_edit=localStorage.getItem('edit_team_id');  
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
var parse_int="1";
    let postData = {
             "role": "bt", 
             "match_id": this.Match_Uniqueid,
         
    }
 
    this.http.post(this.baseurl+"get_players", postData, requestOptions)
      .subscribe(data => {
		  
		let selectedArray1=[];
		 this.displaybat = JSON.parse(data['_body']).data;
		 this.player_url = JSON.parse(data['_body']).player_url;
		
		
		 for (let i = 0; i < this.displaybat.length; i++) {
        this.displaybat[i].minus = false;
		
		let postcontest = {
             "team_id": this.team_id_edit,
           "player_id":this.displaybat[i].player_id,
         
         }
		 this.http.post(this.baseurl+"player_in_out", postcontest, requestOptions)
      .subscribe(data => {
		  
		  console.log(JSON.parse(data['_body']).data);
		  let resp=JSON.parse(data['_body']).data.response;
		  if(resp==true)
		  {
        //isChecked = true;
		this.displaybat[i].minus = true;
       /* this.minus=true; 
        selectedArray1.push(this.displaybat[i]);
		
	
		 //this.players++;
		 //total player count
	  this.players=parseInt(localStorage.getItem('edit_players_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_players_count',this.players);
	  //Wk count
	  this.players=parseInt(localStorage.getItem('bat_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_bat_count',this.players);
	  
	  //team1 count
	  if(this.displaybat[i].player_team_name == localStorage.getItem('edit_team_1'))
	  {
	  this.players=parseInt(localStorage.getItem('edit_team_1_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_team_1_count',this.players);
	  }
	  else if(this.displaybat[i].player_team_name == localStorage.getItem('edit_team_2'))
	  {
		this.players=parseInt(localStorage.getItem('edit_team_2_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_team_2_count',this.players);  
	  }
	  this.events.publish('user:players_count');
	  let test=localStorage.getItem('edit_credit_point_select');
	  this.players=parseFloat(test)-parseFloat(this.displaybat[i].credit_point);
		 localStorage.setItem('edit_credit_point_select',this.players);
		this.events.publish('user:login');
		
 */
			
		  }
		 /*   localStorage.setItem('edit_bat_list',JSON.stringify(selectedArray1));
		console.log(localStorage.getItem('edit_bat_list'));   */ 
	  });
		
        } 
		
		loading.dismiss();
	  });
  }

  selectedArray :any = [];
  onChange(items,i,cbox){
	//  alert('test');
    let parse_int="1";
    //let isChecked=false;
	
	 console.log(JSON.stringify(localStorage.getItem('edit_bat_list')));
	var widgets = JSON.parse(localStorage.getItem('edit_bat_list'));
console.log(JSON.stringify(widgets));
	this.selectedArray=widgets;
	
	let che_val=parseFloat(localStorage.getItem('edit_credit_point_select'))-parseFloat((items[i].credit_point));

	
	let batsman=parseInt(localStorage.getItem('edit_bat_count'));
	let allrounder=parseInt(localStorage.getItem('edit_ar_count'));
	let bowler=parseInt(localStorage.getItem('edit_bowl_count'));
	let wicketkeeper=parseInt(localStorage.getItem('edit_wk_count'));
	console.log(items[i].minus);
	
	if (cbox.checked == true) {
	
	
	 if(items[i].minus == true && parseInt(localStorage.getItem('edit_players_count')) >=11){
	 items[i]["minus"]=false;
	  alert('only 11 players allowed');
	  localStorage.setItem('error_check_bat','error');
	   cbox.checked=false; 
	  return;
    }
	else if(items[i].minus == true && parseInt(localStorage.getItem('edit_team_1_count')) >=6 && items[i].player_team_name == localStorage.getItem('edit_team_1')){
	  items[i]["minus"]=false;
	  alert('only seven player select same team');
	   localStorage.setItem('error_check_bat','error');
	   cbox.checked=false; 
	  return;
    }
	else if(items[i].minus == true && parseInt(localStorage.getItem('edit_team_2_count')) >=6 && items[i].player_team_name == localStorage.getItem('edit_team_2')){
	  items[i]["minus"]=false;
	  alert('only seven player select same team');
	  return;
    }
	
	 else if(items[i].minus == true && allrounder==2 && batsman==3 && bowler==5 && wicketkeeper==0)
		{
		items[i]["minus"]=false;
	localStorage.setItem('error_check_bat','error');
	  alert('Atleast 1 wicket keeper required');
	   cbox.checked=false; 
	  return;	
		} 
   else if(items[i].minus == true && allrounder==3 && batsman==4 && bowler==2 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	localStorage.setItem('error_check_bat','error');
	  alert('Minimum 3 bowlers required');
	   cbox.checked=false; 
	  return;	

		} 
		else if(items[i].minus == true && allrounder==0 && batsman==4 && bowler==5 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	localStorage.setItem('error_check_bat','error');
	  alert('Atleast 1 Allrounder required');
	   cbox.checked=false; 
	  return;	
		}
		else if(items[i].minus == true && allrounder==0 && batsman==4 && bowler==5 && wicketkeeper==0)
		{
			items[i]["minus"]=false;
	localStorage.setItem('error_check_bat','error');
	  alert('Atleast 1 Allrounder & WicketKeeper required');
	   cbox.checked=false; 
	  return;	
		}
		else if(items[i].minus == true && allrounder==2 && batsman==5 && bowler==2 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	localStorage.setItem('error_check_bat','error');
	  alert('Minimum 3 bowlers required');
	   cbox.checked=false; 
	  return;	
		}
		else if(items[i].minus == true && allrounder==2 && batsman==5 && bowler==0 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	localStorage.setItem('error_check_bat','error');
	  alert('Minimum 3 bowlers required');
	   cbox.checked=false; 
	  return;	
		}
		else if(items[i].minus == true && allrounder==3 && batsman==4 && bowler==0 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	localStorage.setItem('error_check_bat','error');
	  alert('Minimum 3 bowlers required');
	   cbox.checked=false; 
	  return;	
		}
		else if(items[i].minus == true && allrounder==3 && batsman==4 && bowler==2 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	localStorage.setItem('error_check_bat','error');
	  alert('Minimum 3 bowlers required');
	   cbox.checked=false; 
	  return;	
		}
		else if(items[i].minus == true && allrounder==3 && batsman==4 && bowler==1 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	localStorage.setItem('error_check_bat','error');
	  alert('Minimum 3 bowlers required');
	   cbox.checked=false; 
	  return;	
		}
		else if(items[i].minus == true && allrounder==3 && batsman==4 && bowler==1 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	localStorage.setItem('error_check_bat','error');
	  alert('Minimum 3 bowlers required');
	   cbox.checked=false; 
	  return;	
		}
		else if(items[i].minus == true && allrounder==1 && batsman==5 && bowler==4 && wicketkeeper==0)
		{
			items[i]["minus"]=false;
	localStorage.setItem('error_check_bat','error');
	  alert('Atleast 1 wicket keeper required');
	   cbox.checked=false;   
	  return;	
		}
		else if(items[i].minus == true && allrounder==1 && batsman==4 && bowler==5 && wicketkeeper==0)
		{
			items[i]["minus"]=false;
	localStorage.setItem('error_check_bat','error');
	  alert('Atleast 1 wicket keeper required');
	   cbox.checked=false; 
	  return;	
		}
		else if(items[i].minus == true && allrounder==3 && batsman==4 && bowler==3 && wicketkeeper==0)
		{
			items[i]["minus"]=false;
	localStorage.setItem('error_check_bat','error');
	  alert('Atleast 1 wicket keeper required');
	   cbox.checked=false; 
	  return;	
		}
		else if(items[i].minus == true && allrounder==3 && batsman==3 && bowler==4 && wicketkeeper==0)
		{
			items[i]["minus"]=false;
	localStorage.setItem('error_check_bat','error');
	  alert('Atleast 1 wicket keeper required');
	   cbox.checked=false; 
	  return;	
		}
		else if(items[i].minus == true && allrounder==2 && batsman==4 && bowler==4 && wicketkeeper==0)
		{
			items[i]["minus"]=false;
	localStorage.setItem('error_check_bat','error');
	  alert('Atleast 1 wicket keeper required');
	   cbox.checked=false; 
	  return;	
		}
   
	
	
	else if(items[i].minus == true && che_val < 0){
	  items[i]["minus"]=false;
	  alert('maximum credit point exist');
	   localStorage.setItem('error_check_bat','error');
	   cbox.checked=false; 
	  return;
    } 
	else if(items[i].minus == true && batsman >= 5){
	  items[i]["minus"]=false;
	  alert('maximum 5 batsman ');
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
	  this.players=parseInt(localStorage.getItem('edit_players_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_players_count',this.players);
	  //Wk count
	  this.players=parseInt(localStorage.getItem('edit_bat_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_bat_count',this.players);
	  
	  //team1 count
	  if(items[i].player_team_name == localStorage.getItem('edit_team_1'))
	  {
	  this.players=parseInt(localStorage.getItem('edit_team_1_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_team_1_count',this.players);
	  }
	  else if(items[i].player_team_name == localStorage.getItem('edit_team_2'))
	  {
		this.players=parseInt(localStorage.getItem('edit_team_2_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_team_2_count',this.players);  
	  }
	  this.events.publish('user:edit_players_count');
	  let test=localStorage.getItem('edit_credit_point_select');
	  this.players=parseFloat(test)-parseFloat(items[i].credit_point);
		 localStorage.setItem('edit_credit_point_select',this.players);
		this.events.publish('user:edit_login');
		
			
		}
	
   else  {
	 console.log(this.selectedArray.some(e => e.player_id === items[i].player_id)); 
 
    
   let testing_sara= this.selectedArray.some(e => e.player_id === items[i].player_id);
   if(items[i].minus == false && testing_sara==true) {
	   
	    if(localStorage.getItem('edit_captain')==items[i].player_id)
	  {
		 localStorage.setItem('edit_captain',''); 
	  } 
	  if(localStorage.getItem('edit_vice')==items[i].player_id)
	  {
		   localStorage.setItem('edit_vice',''); 
	  }
	   
    this.players=parseInt(localStorage.getItem('edit_players_count'))-parseInt(parse_int);
	localStorage.setItem('edit_players_count',this.players);
	 //Wk count
	  this.players=parseInt(localStorage.getItem('edit_bat_count'))-parseInt(parse_int);
	  localStorage.setItem('edit_bat_count',this.players);
	 //team1 count
	  if(items[i].player_team_name == localStorage.getItem('edit_team_1'))
	  {
	  this.players=parseInt(localStorage.getItem('edit_team_1_count'))-parseInt(parse_int);
	  localStorage.setItem('edit_team_1_count',this.players);
	  }
	  else if(items[i].player_team_name == localStorage.getItem('edit_team_2'))
	  {
		this.players=parseInt(localStorage.getItem('edit_team_2_count'))-parseInt(parse_int);
	  localStorage.setItem('edit_team_2_count',this.players);  
	  }
	this.events.publish('user:edit_players_count');
	let test=localStorage.getItem('edit_credit_point_select');
   this.players=parseFloat(test)+parseFloat((items[i].credit_point));
		 localStorage.setItem('edit_credit_point_select',this.players);
		
		 this.events.publish('user:edit_login');
 let newArray=this.selectedArray.filter(function(el) {
 return el.player_id !== items[i].player_id;

 
 });
 this.selectedArray = newArray;
     }  
   }
//console.log(JSON.stringify(this.selectedArray));
		localStorage.setItem('edit_bat_list',JSON.stringify(this.selectedArray));
		/* console.log(JSON.parse(localStorage.getItem('bat_list'))); */
     }  
    

}
