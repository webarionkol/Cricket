import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PointPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-point-popup',
  templateUrl: 'point-popup.html',
})
export class PointPopupPage {
	
	points:any;
	play_pt:any;
	wstatus:any;
	date:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
	  
	  this.points=navParams.get('u_point');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PointPopupPage');
	this.play_pt=this.points.play_pt;
	this.wstatus=this.points.status;
	this.date=this.points.created_at;
	
	
  }
  
  closeModal()
  {
    this.view.dismiss();
  }

}
