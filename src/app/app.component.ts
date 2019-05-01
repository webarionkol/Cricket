import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PointPurchasePage } from '../pages/point-purchase/point-purchase';
import { HomePage } from '../pages/home/home';
//import { DasbordPage } from '../pages/dasbord/dasbord';
import { WidthrawPage } from '../pages/widthraw/widthraw';
import { AddCashPage } from '../pages/add-cash/add-cash';
	import { LoginPage } from '../pages/login/login';
//import { RegisterPage } from '../pages/register/register';
import { HomeFooterPage } from '../pages/home-footer/home-footer';
//import { PlaypointsPage } from '../pages/playpoints/playpoints';
import { HowtoplayPage } from '../pages/howtoplay/howtoplay';
import { InvitefriendPage } from '../pages/invitefriend/invitefriend';
import { VerifyPage } from '../pages/verify/verify';
import { FantasyPointPage } from '../pages/fantasy-point/fantasy-point';
import { AboutPage } from '../pages/about/about';
import { FaqPage } from '../pages/faq/faq';
import { TransactionPage } from '../pages/transaction/transaction';
import {App} from 'ionic-angular';
import { Http, Headers,RequestOptions} from '@angular/http';
import { ContestPage } from '../pages/contest/contest';
import { SelectPlayerPage } from '../pages/select-player/select-player';
import { SelectCaptainPage } from '../pages/select-captain/select-captain';
import { PrivacyPage } from '../pages/privacy/privacy';
import { TermsPage } from '../pages/terms/terms';
import { MyteamsPage } from '../pages/myteams/myteams';
import { EditPlayerPage } from '../pages/edit-player/edit-player';
import { EditselectCaptainPage } from '../pages/editselect-captain/editselect-captain'; 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	
	glo_user_token_v:any;
  glo_user_token='glo_user_token';
 
 @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, icon: string, component: any}>;
baseurl:any;
counter:any;
  constructor(public platform: Platform,public statusBar: StatusBar, public splashScreen: SplashScreen,public http:Http,public app: App) {
    this.backbutton();

   this.initializeApp();
 this.baseurl=localStorage.getItem('global_baseurl');
    // used for an example of ngFor and navigation
    this.pages = [
     { title: 'Home', icon:'home', component: HomeFooterPage },
      { title: 'Add Cash', icon:'card', component: AddCashPage },
      { title: 'Withdraw', icon:'cash', component: WidthrawPage },
      { title: 'Point Purchase', icon:'card', component: PointPurchasePage },
      { title: 'Verification', icon:'checkmark-circle', component: VerifyPage },
      { title: 'Transaction', icon:'list-box', component: TransactionPage }

      //{ title: 'Signup', component: RegisterPage },
     // { title: 'playpoints', component: PlaypointsPage }


    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  
  logout()
  {

    //console.log('hi');

    this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
    headers.append("Accept", 'application/json');

    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });

    let postData={

    }
    this.http.post(this.baseurl+"logout",postData ,requestOptions)
    .subscribe(data => {

        if(JSON.parse(data['_body']).status=='success')
        {
localStorage.removeItem('glo_user_token');
         // this.navCtrl.setRoot(LoginPage);
		 
		          this.nav.push(LoginPage);

        }
     // console.log(JSON.parse(data['_body']).data);












    });




  }
  backbutton(){
 // this.platform.registerBackButtonAction(() => {
 //        if (this.counter == 0) {
 //          this.counter++;
 //          this.presentToast();
 //          setTimeout(() => { this.counter = 0 }, 3000)
 //        } else {
 //          // console.log("exitapp");
 //          this.platform.exitApp();
 //        }
 //      }, 0)

this.platform.registerBackButtonAction(()=>{

let nav = this.app.getActiveNavs()[0];
     let activeView = nav.getActive();  

       console.log('** my space 1234 activeView view in myspace** '+activeView.name);

     // Checks if can go back before show up the alert
     if(activeView.name === 'LoginPage' || activeView.name === 'HomeFooterPage' ) {


        if (this.counter == 0) {
          this.counter++;
          // this.presentToast();
          // this.navCtrl.setRoot(MapviewjobsPage);
          setTimeout(() => { this.counter = 0 }, 3000)
        } else {
          // console.log("exitapp");
          this.platform.exitApp();
        }
        
       
         }else if(activeView.name === 'ContestPage'){
         
    this.nav.setRoot(HomeFooterPage);

         }else if(activeView.name === 'SelectPlayerPage'){
         
    this.nav.setRoot(ContestPage);

         }else if(activeView.name === 'SelectCaptainPage'){
         
    this.nav.setRoot(ContestPage);

         }else if(activeView.name === 'AddCashPage'){
         
    this.nav.setRoot(HomeFooterPage);

         }else if(activeView.name === 'WidthrawPage'){
         
    this.nav.setRoot(HomeFooterPage);

         }else if(activeView.name === 'TransactionPage'){
         
    this.nav.setRoot(HomeFooterPage);

         }else if(activeView.name === 'VerifyPage'){
         
    this.nav.setRoot(HomeFooterPage);

         }else if(activeView.name === 'InvitefriendPage'){
         
    this.nav.setRoot(HomeFooterPage);

         }else if(activeView.name === 'FantasyPointPage'){
         
    this.nav.setRoot(HomeFooterPage);

         }else if(activeView.name === 'HowtoplayPage'){
         
    this.nav.setRoot(HomeFooterPage);

         }else if(activeView.name === 'AboutPage'){
         
    this.nav.setRoot(HomeFooterPage);

         }else if(activeView.name === 'FaqPage'){
         
    this.nav.setRoot(HomeFooterPage);

         }else if(activeView.name === 'PrivacyPage'){
         
    this.nav.setRoot(HomeFooterPage);

         }else if(activeView.name === 'TermsPage'){
         
    this.nav.setRoot(HomeFooterPage);

         }else if(activeView.name === 'MyteamsPage'){
         
    this.nav.setRoot(HomeFooterPage);

         }else if(activeView.name === 'EditPlayerPage'){
         
    this.nav.setRoot(ContestPage);

         }else if(activeView.name === 'EditselectCaptainPage'){
         
    this.nav.setRoot(ContestPage);

         }
		 

    // else if(activeView.name === 'InterviewandvenuePage'){
         
    // this.navCtrl.setRoot(MapviewjobsPage);

    //      }else if(activeView.name === 'ContactsPage'){
         
    // this.navCtrl.setRoot(MapviewjobsPage);

    //      }else if(activeView.name === 'FeedbackPage'){
         
    // this.navCtrl.setRoot(MapviewjobsPage);

    //      }else if(activeView.name === 'BookingPage'){
         
    // this.navCtrl.setRoot(MapviewjobsPage);

    //      }else if(activeView.name === 'RegisterPage'){
         
    // this.navCtrl.setRoot(LoginPage);

    //      }else if(activeView.name === 'PackagePage'){
         
    // this.navCtrl.setRoot(MapviewjobsPage);

    //      }else if(activeView.name === 'ForgottenpasswordPage'){
         
    // this.navCtrl.setRoot(LoginPage);

    //      }else if(activeView.name === 'AboutusPage'){
         
    // this.navCtrl.setRoot(MapviewjobsPage);

    //      }else if(activeView.name === 'MapviewjobsPage'){
         
    // this.navCtrl.setRoot(MapviewjobsPage);

    //      }

 });

}
  
  
}
