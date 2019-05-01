import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the RankDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rank-details',
  templateUrl: 'rank-details.html',
})
export class RankDetailsPage {
con_id:any;
winprize:any;
glo_user_token_v:any;
 glo_user_token='glo_user_token';
displayrank:any=[];
displayprize:any=[];
arr = [];
displayrank1:any[];
displayprize1:any[];
baseurl:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController,  public http: Http) {
	  this.con_id = navParams.get('data');
	  console.log('contest_id___'+this.con_id); 
	  this.baseurl=localStorage.getItem('global_baseurl');
  }

  closeModal()
  {
    this.view.dismiss();
  }

 
  ionViewDidLoad() {
     console.log('ionViewDidLoad RankDetailsPage');
	 this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
	  var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
   const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
             "contest_id": this.con_id,
         
    }
 
    this.http.post(this.baseurl+"get_contest", postData, requestOptions)
      .subscribe(data => { 
		  
		
		
		
	 console.log(JSON.parse(data['_body']).data.rank_list); 
		console.log(JSON.parse(data['_body']).status);

			 var displayprize1 = JSON.parse(JSON.parse(data['_body']).data.prize_list);
			 var displayrank1 = JSON.parse(JSON.parse(data['_body']).data.rank_list);
			
			  
			  var arr = [];
			  
Object.keys(displayprize1).forEach(function(key)
{
    arr.push(displayprize1[key]);
    
	}); 
	this.displayprize=arr; 

	var arr1 = [];
			  
Object.keys(displayrank1).forEach(function(key)
{
    arr1.push(displayrank1[key]);
   
	}); 
	this.displayrank=arr1;
	
	
	this.winprize=JSON.parse(data['_body']).data.winning_pirze; 
	 });
	
  }

}
