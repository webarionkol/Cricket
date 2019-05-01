import { BrowserModule } from '@angular/platform-browser';
import { NewTransactionPage } from '../pages/instamojo/new_transaction'
import {InAppBrowser} from '@ionic-native/in-app-browser';
import { HTTP } from '@ionic-native/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PrivacyPage } from '../pages/privacy/privacy';
import { TermsPage } from '../pages/terms/terms';
import { PointPurchasePage } from '../pages/point-purchase/point-purchase';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';  
//import { DasbordPage } from '../pages/dasbord/dasbord';
import { ListPage } from '../pages/list/list';
import { ContestPage } from '../pages/contest/contest';
import { SelectPlayerPage } from '../pages/select-player/select-player';
import { EditselectCaptainPage } from '../pages/editselect-captain/editselect-captain'; 
import { EditPlayerPage } from '../pages/edit-player/edit-player';
import { WidthrawPage } from '../pages/widthraw/widthraw';
import { AddCashPage } from '../pages/add-cash/add-cash';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomeFooterPage } from '../pages/home-footer/home-footer';
import { PlaypointsPage } from '../pages/playpoints/playpoints';
import { MyteamsPage } from '../pages/myteams/myteams';
import { SelectCaptainPage } from '../pages/select-captain/select-captain';
import { HowtoplayPage } from '../pages/howtoplay/howtoplay';
import { InvitefriendPage } from '../pages/invitefriend/invitefriend';
import { InvitecodePage } from '../pages/invitecode/invitecode';
import { MatchResultPage } from '../pages/match-result/match-result';
import { LeaderboardPage } from '../pages/leaderboard/leaderboard';
import { TransactionPage } from '../pages/transaction/transaction';
import { PaymentGatewayPage } from '../pages/payment-gateway/payment-gateway';
import { PaymentTransactionPage } from '../pages/payment-transaction/payment-transaction';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { PasswordOtpPage } from '../pages/password-otp/password-otp';


import { VerifyPage } from '../pages/verify/verify';
import { FantasyPointPage } from '../pages/fantasy-point/fantasy-point';
import { AboutPage } from '../pages/about/about';
import { FaqPage } from '../pages/faq/faq';
import { OtpPage } from '../pages/otp/otp';
import { SelectTeamPage } from '../pages/select-team/select-team';
import { FilterContestPage } from '../pages/filter-contest/filter-contest';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@NgModule({
  declarations: [
      NewTransactionPage,
    MyApp,
    HomePage,
   // DasbordPage,
    ListPage,
    OtpPage,
    ContestPage,
    SelectPlayerPage,
    WidthrawPage,
    PrivacyPage,
    TermsPage,
    LoginPage,
    ForgotPasswordPage,
    PasswordOtpPage,
    FilterContestPage,
    PointPurchasePage,
   
    PaymentGatewayPage,
    PaymentTransactionPage,
    RegisterPage,
    EditPlayerPage,
    EditselectCaptainPage,  
    SelectTeamPage,TransactionPage,
    HomeFooterPage,AddCashPage,InvitecodePage,VerifyPage,FantasyPointPage,AboutPage,FaqPage,
    PlaypointsPage,MyteamsPage,SelectCaptainPage,LeaderboardPage,HowtoplayPage,InvitefriendPage,MatchResultPage
  ],
  imports: [
    BrowserModule,
	HttpModule,
	HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      NewTransactionPage,
    MyApp,
   // DasbordPage,
    HomePage,
    OtpPage,  
    ListPage,
    ContestPage,
    SelectPlayerPage,
    WidthrawPage,
    FilterContestPage,
    SelectTeamPage,
    EditPlayerPage,
	 PrivacyPage,
    TermsPage,
    PointPurchasePage,
	
	  PaymentGatewayPage,
    PaymentTransactionPage,
    ForgotPasswordPage,
    PasswordOtpPage,
  
    EditselectCaptainPage,
    LoginPage,
    RegisterPage,TransactionPage,
    HomeFooterPage,AddCashPage,InvitecodePage,VerifyPage,FantasyPointPage,AboutPage,FaqPage,
    PlaypointsPage,MyteamsPage,LeaderboardPage,SelectCaptainPage,HowtoplayPage,InvitefriendPage,MatchResultPage
  ],
  providers: [
      InAppBrowser,
      HTTP,
    StatusBar,
    SplashScreen,
	Facebook,
	GooglePlus,
    PayPal,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
