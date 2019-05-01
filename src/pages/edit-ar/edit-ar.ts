import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams } from 'ionic-angular';
import { Http, Headers ,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
/**
 * Generated class for the EditArPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-ar',
  templateUrl: 'edit-ar.html',
})
export class EditArPage {

 displayar:any[];
players: any;
MatchId='MatchId';
Match_Uniqueid:any;
glo_user_token_v:any;
glo_user_token='glo_user_token';
players_count='players_count';
ar_count='ar_count';
team_1_count='team_1_count';
team_2_count='team_2_count';
minus=true;
credit_point_select='credit_point_select';
batsman:any;
allround:any;
bowler:any;
wicketkeeper:any;
baseurl:any;
team_id_edit:any;
player_url:any;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,public http: Http,public events: Events) {
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
	  
	  
	  
	  
	  
	  
	  
    var parse_int="1";
	this.Match_Uniqueid= localStorage.getItem(this.MatchId);
	
	this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
	  var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
	const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
             "role": "ar",
             "match_id":  this.Match_Uniqueid,
         
    }
 
    this.http.post(this.baseurl+"get_players", postData, requestOptions)
      .subscribe(data => {
		
		
		let  selectedArray1=[];
		 
		 this.displayar = JSON.parse(data['_body']).data;
		 this.player_url = JSON.parse(data['_body']).player_url;
		 for (let i = 0; i < this.displayar.length; i++) {
        this.displayar[i].minus = false;
		
		let postcontest = {
             "team_id": this.team_id_edit,
           "player_id":this.displayar[i].player_id,
         
         }
		 this.http.post(this.baseurl+"player_in_out", postcontest, requestOptions)
      .subscribe(data => {
		  
		  console.log(JSON.parse(data['_body']).data);
		  let resp=JSON.parse(data['_body']).data.response;
		  if(resp==true)
		  {
        //isChecked = true;
		this.displayar[i].minus = true;
      
		

			
		  }
		  
	  });
		
		
		
      } 
			loading.dismiss();

	  });
  }   
   selectedArray :any = [];
   onChange(items,i,cbox){
		
		 
		 console.log(JSON.stringify(localStorage.getItem('edit_ar_list')));
	var widgets = JSON.parse(localStorage.getItem('edit_ar_list'));
console.log(JSON.stringify(widgets));
	this.selectedArray=widgets;
		 
	   let credit_po= items[i].credit_point;
    let parse_int="1";
	
	let batsman=parseInt(localStorage.getItem('edit_bat_count'));
	let allrounder=parseInt(localStorage.getItem('edit_ar_count'));
	let bowler=parseInt(localStorage.getItem('edit_bowl_count'));
	let wicketkeeper=parseInt(localStorage.getItem('edit_wk_count'));
	// alert(batsman);
//	alert(allrounder);
//	alert(bowler);
//	alert(wicketkeeper);
	
	let che_val=parseFloat(localStorage.getItem('edit_credit_point_select'))-parseFloat((items[i].credit_point));
	console.log(che_val);
	if (cbox.checked == true) {
  
	 if(items[i].minus == true && parseInt(localStorage.getItem('edit_players_count')) >=11){
	 items[i]["minus"]=false;
	  alert('only 11 players allowed');
	   cbox.checked=false; 
	  return;
    }
	else if(items[i].minus == true && parseInt(localStorage.getItem('edit_team_1_count')) >=7 && items[i].player_team_name == localStorage.getItem('edit_team_1')){
	  items[i]["minus"]=false;
	  alert('only seven player select same team');
	   cbox.checked=false; 
	  return;
    }
	else if(items[i].minus == true && parseInt(localStorage.getItem('edit_team_2_count')) >=7 && items[i].player_team_name == localStorage.getItem('edit_team_2')){
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
		else if(items[i].minus == true && allrounder==2 && batsman==0 && bowler==5 && wicketkeeper==0)
		{
			
		items[i]["minus"]=false;
	    alert('Atleast 1 wicket keeper and Minimum 3 batsman required');
	    cbox.checked=false; 
        return;
		}
		else if(items[i].minus == true && allrounder==1 && batsman==2 && bowler==5 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	        alert('Minimum 3 Batsman required');
	        cbox.checked=false; 
            return;

		}
		else if(items[i].minus == true && allrounder==1 && batsman==5 && bowler==2 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	        alert('Minimum 3 Bowler required');
	        cbox.checked=false; 
            return;
		}
		else if(items[i].minus == true && allrounder==1 && batsman==5 && bowler==2 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	        alert('Minimum 3 Bowler required');
	        cbox.checked=false; 
            return;

		}
		else if(items[i].minus == true && allrounder==2 && batsman ==2 && bowler ==5 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	        alert('Minimum 3 Bats required');
	        cbox.checked=false; 
            return;

		}
		else if(items[i].minus == true && allrounder==2 && batsman ==5 && bowler ==2 && wicketkeeper==1)
		{
			
			items[i]["minus"]=false;
	        alert('Minimum 3 Bowler required');
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
		else if(items[i].minus == true && allrounder==3 && batsman==4 && bowler==2 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	        alert('Minimum 3 Bowler required');
	        cbox.checked=false; 
            return;

		}
		else if(items[i].minus == true && allrounder==3 && batsman==2 && bowler==4 && wicketkeeper==1)
		{
			
			
			items[i]["minus"]=false;
	        alert('Minimum 3 Batsman required');
	        cbox.checked=false; 
            return;

		}
		else if(items[i].minus == true && allrounder==2 && batsman==2 && bowler==5 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	        alert('Minimum 3 Batsman required');
	        cbox.checked=false; 
            return;

		}
		else if(items[i].minus == true && allrounder==2 && batsman==5 && bowler==2 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	        alert('Minimum 3 Bowler required');
	        cbox.checked=false; 
            return;

		}
		else if(items[i].minus == true && allrounder==2 && batsman==4 && bowler==4 && wicketkeeper==0)
		{
			items[i]["minus"]=false;
	        alert('Minimum 1 wicketkeeper required');
	        cbox.checked=false; 
            return;

		}
		else if(items[i].minus == true && allrounder==0 && batsman==5 && bowler==5 && wicketkeeper==0)
		{
			items[i]["minus"]=false;
	        alert('Minimum 1 wicketkeeper required');
	        cbox.checked=false; 
            return;

		}
		else if(items[i].minus == true && allrounder==2 && batsman==5 && bowler==3 && wicketkeeper==0)
		{
			items[i]["minus"]=false;
	        alert('Minimum 1 wicketkeeper required');
	        cbox.checked=false; 
            return;

		}
		else if(items[i].minus == true && allrounder==3 && batsman==3 && bowler==2 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	        alert('Minimum 3 Bowler required');
	        cbox.checked=false; 
            return;

		}
		else if(items[i].minus == true && allrounder==3 && batsman==2 && bowler==3 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	        alert('Minimum 3 Batsman required');
	        cbox.checked=false; 
            return;

		}
		else if(items[i].minus == true && allrounder==3 && batsman==4 && bowler==0 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	        alert('Minimum 3 Batsman required');
	        cbox.checked=false; 
            return;

		}
		else if(items[i].minus == true && allrounder==3 && batsman==0 && bowler==4 && wicketkeeper==1)
		{
			items[i]["minus"]=false;
	        alert('Minimum 3 Batsman required');
	        cbox.checked=false; 
            return;

		}
		else if(items[i].minus == true && allrounder==2 && batsman==3 && bowler==5 && wicketkeeper==0)
		{
			items[i]["minus"]=false;
	        alert('Minimum 1 wicketkeeper required');
	        cbox.checked=false; 
            return;

		}
		
		
		else if(items[i].minus == true && allrounder >= 3){
	  items[i]["minus"]=false;
	  alert('maximum 3 allrounder ');
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
	  this.players=parseInt(localStorage.getItem('edit_ar_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_ar_count',this.players);
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
	   this.players=parseFloat(test)-parseFloat(credit_po);
		 localStorage.setItem('edit_credit_point_select',this.players);
		this.events.publish('user:edit_login');
		
			
		}
   
   else {
	   
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
	  
	  this.minus=false; 
      
	  //this.players--;
    this.players=parseInt(localStorage.getItem('edit_players_count'))-parseInt(parse_int);
	localStorage.setItem('edit_players_count',this.players);
	 //Wk count
	  this.players=parseInt(localStorage.getItem('edit_ar_count'))-parseInt(parse_int);
	  localStorage.setItem('edit_ar_count',this.players);
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
	
  this.players=parseFloat(localStorage.getItem('edit_credit_point_select'))+parseFloat(credit_po);
		 localStorage.setItem('edit_credit_point_select',this.players);
		
		 this.events.publish('user:edit_login');
		 
		
 let newArray=this.selectedArray.filter(function(el) {
 return el.player_id !== items[i].player_id;

 
 });
 this.selectedArray = newArray;
 
     }  
   }
  
/*  console.log(JSON.stringify(this.selectedArray)); */
		localStorage.setItem('edit_ar_list',JSON.stringify(this.selectedArray));
		
     }  

}
