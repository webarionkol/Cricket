import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http, Headers , RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
/**
 * Generated class for the EditWkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-wk',
  templateUrl: 'edit-wk.html',
})
export class EditWkPage {

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
team_id_edit:any;
display_player:any;
edit_wk_list='edit_wk_list';
selectedArray1:any=[];
selectedArray2:any=[];
selectedArray3:any=[];
selectedArray4:any=[];
player_url:any;
  constructor(public navCtrl: NavController,public events: Events,public loadingCtrl: LoadingController, public navParams: NavParams,public alertCtrl:AlertController,public http: Http) {
    
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
	
	
	this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
		   
		 var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
	const requestOptions = new RequestOptions({ headers: headers });
var parse_int="1";
    let postData = {
             "role": "wk",
             "match_id": this.Match_Uniqueid,
         
    }
 
    this.http.post(this.baseurl+"get_players", postData, requestOptions)
      .subscribe(data => {
		  
	 
		   
		 this.displaywk = JSON.parse(data['_body']).data; 
		 this.player_url = JSON.parse(data['_body']).player_url;
		
		localStorage.setItem('player_url',this.player_url);
		
		let selectedArray1=[];
		
		 for (let i = 0; i < this.displaywk.length; i++) {
        this.displaywk[i].minus = false;
		
		let postcontest = {
             "team_id": this.team_id_edit,
           "player_id":this.displaywk[i].player_id,
         
         }
		 this.http.post(this.baseurl+"player_in_out", postcontest, requestOptions)
      .subscribe(data => {
		  console.log(JSON.parse(data['_body']).data);
		  let resp=JSON.parse(data['_body']).data.response;
		  if(resp==true)
		  {
			this.displaywk[i].minus = true;  
			//this.displaywk[i].checked = true;  
		/* 	 this.minus=true; 
     selectedArray1.push(this.displaywk[i]);
      
        
		
	 this.players=parseInt(localStorage.getItem('edit_players_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_players_count',this.players);
	  //Wk count
	 this.players=parseInt(localStorage.getItem('edit_wk_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_wk_count',this.players);
	  //team1 count
	  if(this.displaywk[i].player_team_name == localStorage.getItem('edit_team_1'))
	  {
	 this.players=parseInt(localStorage.getItem('edit_team_1_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_team_1_count',this.players);
	  }
	  else if(this.displaywk[i].player_team_name == localStorage.getItem('edit_team_2'))
	  {
		 this.players=parseInt(localStorage.getItem('edit_team_2_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_team_2_count',this.players);  
	  }
	 this.events.publish('user:players_count'); 
	  
	  this.players=parseFloat(localStorage.getItem('edit_credit_point_select'))-parseFloat(this.displaywk[i].credit_point);
		 localStorage.setItem('edit_credit_point_select',this.players);
		 this.events.publish('user:login');  */

 

			
		  }
		
	  }); 
      } 
		
	  });
	  
	  
	  
	  var parse_int="1";
	  
	  
	
    let postData1 = {
        
             "match_id": this.Match_Uniqueid,
         
    }
 
    this.http.post(this.baseurl+"get_squad", postData1, requestOptions)
      .subscribe(data => {
		  
	 
		   
		 this.display_player = JSON.parse(data['_body']).data.players; 
		console.log( this.display_player);
	 this.selectedArray1=[];
		 this.selectedArray2=[];
		 this.selectedArray3=[];
		 this.selectedArray4=[]; 
		
		 
		
		 for (let i = 0; i < this.display_player.length; i++) {
			
        this.display_player[i].minus = false;
		
		let postcontest = {
             "team_id": this.team_id_edit,
           "player_id":this.display_player[i].player_id,
         
         }
		 this.http.post(this.baseurl+"player_in_out", postcontest, requestOptions)
      .subscribe(data => {
		  console.log(JSON.parse(data['_body']).data);
		  let resp=JSON.parse(data['_body']).data.response;
		  if(resp==true)
		  {
			  let player_role= this.display_player[i].player_role;
			 	if(player_role=='Wicketkeeper batsman' || player_role=='Wicketkeeper') 
				{
		//	this.displaywk[i].minus = true;  
			//this.displaywk[i].checked = true;  
			   this.players=parseInt(localStorage.getItem('edit_wk_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_wk_count',this.players);
     this.selectedArray1.push(this.display_player[i]);
     localStorage.setItem('edit_wk_list',JSON.stringify(this.selectedArray1));
				}
	 		if(player_role=='Opening batsman' || player_role=='Batsman' || player_role=='Top-order batsman' || player_role=='Middle-order batsman' || player_role=='No')
			{
               this.players=parseInt(localStorage.getItem('edit_bat_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_bat_count',this.players);
     this.selectedArray2.push(this.display_player[i]);
			}
	if(player_role=='Bowler')	
	{
      this.players=parseInt(localStorage.getItem('edit_bowl_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_bowl_count',this.players);
     this.selectedArray3.push(this.display_player[i]);
	}
	if(player_role=='Bowling allrounder' || player_role=='Allrounder' || player_role=='Batting allrounder')
	{
		this.players=parseInt(localStorage.getItem('edit_ar_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_ar_count',this.players);
     this.selectedArray4.push(this.display_player[i]);
		
	}		
			
	 this.players=parseInt(localStorage.getItem('edit_players_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_players_count',this.players);
	  //Wk count
	
	  //team1 count
	  if(this.display_player[i].player_team_name == localStorage.getItem('edit_team_1'))
	  {
	 this.players=parseInt(localStorage.getItem('edit_team_1_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_team_1_count',this.players);
	  }
	  else if(this.display_player[i].player_team_name == localStorage.getItem('edit_team_2'))
	  {
		 this.players=parseInt(localStorage.getItem('edit_team_2_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_team_2_count',this.players);  
	  }
	 this.events.publish('user:edit_players_count'); 
	  
	  this.players=parseFloat(localStorage.getItem('edit_credit_point_select'))-parseFloat(this.display_player[i].credit_point);
		 localStorage.setItem('edit_credit_point_select',this.players);
		 this.events.publish('user:edit_login'); 



			
		  }
		  
		   localStorage.setItem('edit_bat_list',JSON.stringify(this.selectedArray2));
		   localStorage.setItem('edit_bow_list',JSON.stringify(this.selectedArray3));
		   localStorage.setItem('edit_ar_list',JSON.stringify(this.selectedArray4));
		   //localStorage.setItem('wk_list',JSON.stringify(this.selectedArray));
		//console.log(JSON.(localStorage.getItem('edit_wk_list'))); 
		
//console.log(widgets);
	  }); 
      } 
	   
	  }); 
	   
	  
	 
	 loading.dismiss(); 
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
	 console.log(JSON.stringify(localStorage.getItem('edit_wk_list')));
	var widgets = JSON.parse(localStorage.getItem('edit_wk_list'));
console.log(JSON.stringify(widgets));
	this.selectedArray=widgets;
	
	//alert('dddd');
 if (cbox.checked == true) {
  
	 if(items[i].minus == true && parseInt(localStorage.getItem('edit_wk_count')) == 1 && cbox.checked===true){
		 
		 
		 cbox.checked=false;   
 localStorage.setItem('error_check','error');
  items[i].minus=false;
	  alert('maximum one wikect keeper');
	 return;
    }
	
	if(items[i].minus == true && parseInt(localStorage.getItem('edit_players_count')) >= 11){
	localStorage.setItem('error_check','error');
	items[i]["minus"]=false;
	  cbox.checked=false; 
	  alert('only 11 players allowed');
	  return;
    }
	if(items[i].minus == true && parseInt(localStorage.getItem('edit_team_1_count')) >= 7 && items[i].player_team_name == localStorage.getItem('edit_team_1')){
	 localStorage.setItem('error_check','error'); 
	  items[i]["minus"]=false;
	   cbox.checked=false; 
	  alert('only seven player select same team');
	  return;
    }
	if(items[i].minus == true && parseInt(localStorage.getItem('edit_team_2_count')) >= 7 && items[i].player_team_name == localStorage.getItem('edit_team_2')){
	  localStorage.setItem('error_check','error');
	  items[i]["minus"]=false;
	   cbox.checked=false; 
	  alert('only seven player select same team');
	  return;
    }
	let che_val=parseFloat(localStorage.getItem('edit_credit_point_select'))-parseFloat((items[i].credit_point));
	
	if(items[i].minus == true && che_val < 0){
	 localStorage.setItem('error_check','error');
	 items[i]["minus"]=false;
	  alert('maximum credit point exist');
	  return;
    }
	 
     if(items[i].minus == true && parseInt(localStorage.getItem('edit_wk_count')) == 0){
       this.selectedArray.push(items[i]);
       this.minus=true; 
        
		
	 this.players=parseInt(localStorage.getItem('edit_players_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_players_count',this.players);
	  //Wk count
	 this.players=parseInt(localStorage.getItem('edit_wk_count'))+parseInt(parse_int);
	  localStorage.setItem('edit_wk_count',this.players);
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
	  
	  this.players=parseFloat(localStorage.getItem('edit_credit_point_select'))-parseFloat(items[i].credit_point);
		 localStorage.setItem('edit_credit_point_select',this.players);
		this.events.publish('user:edit_login');
		
			
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
      
		//this.players--;
    this.players=parseInt(localStorage.getItem('edit_players_count'))-parseInt(parse_int);
	localStorage.setItem('edit_players_count',this.players);
	 //Wk count
	  this.players=parseInt(localStorage.getItem('edit_wk_count'))-parseInt(parse_int);
	  localStorage.setItem('edit_wk_count',this.players);
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
	
  this.players=parseFloat(localStorage.getItem('edit_credit_point_select'))+parseFloat((items[i].credit_point));
		 localStorage.setItem('edit_credit_point_select',this.players);
		
		 this.events.publish('user:edit_login');
		 
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
 
 
    localStorage.setItem('edit_wk_list',JSON.stringify(this.selectedArray));
    
  
console.log(localStorage.getItem('edit_wk_list')); 
  }
}
