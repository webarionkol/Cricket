import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App} from 'ionic-angular';
import { Http, Headers ,RequestOptions} from '@angular/http';
import { ContestPage } from '../contest/contest';
import 'rxjs/add/operator/map';
/**
 * Generated class for the EditselectCaptainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editselect-captain',
  templateUrl: 'editselect-captain.html',
})
export class EditselectCaptainPage {
bat_list='bat_list';
wk_list1:any;
wk_list2:any;
bow_list1:any;
bow_list2:any;
ar_list1:any;
ar_list2:any;
bat_list1:any;
bat_list2:any;
playerlist:any;
 MatchId='MatchId';
 glo_user_token='glo_user_token';
glo_user_token_v:any;
Match_Uniqueid:any;
relationship:any; 
relationship1:any;
baseurl:any;
user_team_count_new:any;
site_name:any;
minus=false;
player_url:any;
minus1=false;
isenabled:boolean=false;;
  constructor(public navCtrl: NavController,  public navParams: NavParams, public http: Http,public app:App) {
  this.baseurl=localStorage.getItem('global_baseurl');  
  this.site_name=localStorage.getItem('site_name');
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad SelectCaptainPage');
   this.player_url=localStorage.getItem('player_url');
   
   
	
	var wk_list1=JSON.parse(localStorage.getItem('edit_wk_list'));
	var bow_list1=JSON.parse(localStorage.getItem('edit_bow_list'));
	var ar_list1=JSON.parse(localStorage.getItem('edit_ar_list'));
    var bat_list1=JSON.parse(localStorage.getItem('edit_bat_list'));
	// console.log(JSON.parse(localStorage.getItem('ar_list')));
	 //localStorage.setItem('edit_captain_value','empty');
	 //localStorage.setItem('edit_vicecaptain_value','empty');
	var arr = [];
this.relationship=localStorage.getItem('edit_captain'); 
this.relationship1=localStorage.getItem('edit_vice');

if(this.relationship && this.relationship1)
	 {
		this.isenabled=true;
	 }else{
	 
	this.isenabled=false;
	 }
Object.keys(wk_list1).forEach(function(key)
{
	if(wk_list1[key].player_id==localStorage.getItem('edit_captain'))
	{
		wk_list1[key]['minus']=true;
	} 
	else
	{
		wk_list1[key]['minus']=false;
	}
	if(wk_list1[key].player_id==localStorage.getItem('edit_vice'))
	{
		wk_list1[key]['minus1']=true;
	}
	else 
	{
		wk_list1[key]['minus1']=false;
	}
	
    arr.push(wk_list1[key]);
	});
this.wk_list2 = arr;
  
  
var arr3 = [];
 
Object.keys(bat_list1).forEach(function(key)
{
	console.log(bat_list1[key].player_id);
	console.log(localStorage.getItem('edit_captain'));
	if(bat_list1[key].player_id==localStorage.getItem('edit_captain'))
	{
		bat_list1[key]['minus']=true;
	}
	else
	{
		bat_list1['minus']=false;
	}
	if(bat_list1[key].player_id==localStorage.getItem('edit_vice'))
	{
		bat_list1[key]['minus1']=true;
	}
	else
	{
		bat_list1[key]['minus1']=false;
	}
	
	
    arr3.push(bat_list1[key]);
   
	});
this.bat_list2 = arr3;

var arr2 = [];

Object.keys(ar_list1).forEach(function(key)
{
	if(ar_list1[key].player_id==localStorage.getItem('edit_captain'))
	{
		ar_list1[key]['minus']=true;
	}
	else
	{
		ar_list1[key]['minus']=false;
	}
	if(ar_list1[key].player_id==localStorage.getItem('edit_vice'))
	{
		ar_list1[key]['minus1']=true;
	}
	else
	{
		ar_list1[key]['minus1']=false;
	}
	
    arr2.push(ar_list1[key]);
	});
this.ar_list2 = arr2;

var arr1 = [];

Object.keys(bow_list1).forEach(function(key)
{
	if(bow_list1[key].player_id==localStorage.getItem('edit_captain'))
	{
		bow_list1[key]['minus']=true;
	}
	else
	{
		bow_list1[key]['minus']=false;
	}
	if(bow_list1[key].player_id==localStorage.getItem('edit_vice'))
	{
		bow_list1[key]['minus1']=true;
	}
	else
	{
		bow_list1[key]['minus1']=false;
	}
	
	
	
    arr1.push(bow_list1[key]);
	});
this.bow_list2 = arr1;
console.log(this.bat_list2);
/* console.log(this.bow_list2);
console.log(this.ar_list2);
console.log(this.bat_list2); */
  }
team_submit()
{
	
	this.isenabled=false;
	
	//console.log(this.relationship);
	//console.log(this.relationship1);
	
	
	
	
	 var wk_list1=JSON.parse(localStorage.getItem('edit_wk_list'));
	var bow_list1=JSON.parse(localStorage.getItem('edit_bow_list'));
	var ar_list1=JSON.parse(localStorage.getItem('edit_ar_list'));
    var bat_list1=JSON.parse(localStorage.getItem('edit_bat_list'));
	
	 var arr = [];

Object.keys(wk_list1).forEach(function(key)
{
    arr.push(wk_list1[key].player_id);
});
Object.keys(bow_list1).forEach(function(key)
{
    arr.push(bow_list1[key].player_id);
}); 
Object.keys(ar_list1).forEach(function(key)
{
    arr.push(ar_list1[key].player_id);
}); 
Object.keys(bat_list1).forEach(function(key)
{ 
    arr.push(bat_list1[key].player_id);
}); 
this.playerlist = arr;
console.log(this.playerlist);
 
this.Match_Uniqueid= localStorage.getItem(this.MatchId);
 this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
 this.user_team_count_new= localStorage.getItem('edit_team_no');
		    
		 var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
   const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
             "matchid": this.Match_Uniqueid,
            "playersjson": this.playerlist,
            "team_no": this.user_team_count_new, 
            "captainid": this.relationship, 
            "vicecaptainid": this.relationship1
           
    }
 
    this.http.post(this.baseurl+"user_update_team_post", postData, requestOptions)
      .subscribe(data => {
     //console.log(JSON.parse(data['_body']).status);
	 if(JSON.parse(data['_body']).status=='success')
	 {
		 alert(JSON.parse(data['_body']).data);
		 this.app.getRootNavs()[0].push(ContestPage,{data:this.MatchId});
	 }
	 else if(JSON.parse(data['_body']).status=='error')
	 {
		 alert(JSON.parse(data['_body']).data);
		this.isenabled=true;
		 this.app.getRootNavs()[0].push(ContestPage,{data:this.MatchId});
	 }
          
});

}

radio_select(test,value,e) {

  if(this.relationship == this.relationship1 && test=='cap')
  {
  //this.relationship=null;
  this.relationship1=null;
   this.minus1=false;
   let prag=document.getElementsByClassName("captain") as HTMLCollectionOf<HTMLElement>;
   for (var i=0; i<prag.length; i++) {
   // prag[i].style.cssText = "display: none !important";
    prag[i].style.display = "none";
}
   
   let elem = document.getElementById('vc_'+value.player_id);
	  elem.style.cssText = "display: none !important";
	  let elem1 = document.getElementById('c_'+value.player_id);
	  elem1.style.cssText = "display: block !important";
  }
  else if(this.relationship == this.relationship1 && test=='vcap')
  {
	 this.relationship=null; 
	 this.minus=false; 
	  let prag=document.getElementsByClassName("vicecaptain") as HTMLCollectionOf<HTMLElement> ;
   for (var i=0; i<prag.length; i++) {
    prag[i].style.cssText = "display: none !important";
}
	
	 let elem = document.getElementById('c_'+value.player_id);
	  elem.style.cssText = "display: none !important";
	  let elem1 = document.getElementById('vc_'+value.player_id);
	  elem1.style.cssText = "display: block !important";
  }
  
   else if(test=='cap')
  {
	  let prag=document.getElementsByClassName("captain") as HTMLCollectionOf<HTMLElement>;
   for (var i=0; i<prag.length; i++) {
    prag[i].style.cssText = "display: none !important";
}
	  let elem = document.getElementById('c_'+value.player_id);
	  elem.style.cssText = "display: block !important";
	
  }else if(test=='vcap')
  {
	  let prag=document.getElementsByClassName("vicecaptain") as HTMLCollectionOf<HTMLElement>;
   for (var i=0; i<prag.length; i++) {
    prag[i].style.cssText = "display: none !important";
}
	   let elem = document.getElementById('vc_'+value.player_id);
	  elem.style.cssText = "display: block !important";
 
  } 
	if(this.relationship && this.relationship1)
	 {
		this.isenabled=true;
	 }else{
	 
	this.isenabled=false;
	 }
	 
  }
}
