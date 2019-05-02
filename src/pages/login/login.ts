import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
//import { HomePage } from '../home/home';
//import { DasbordPage } from '../dasbord/dasbord';
import { HomeFooterPage } from '../home-footer/home-footer';
//import { HttpClient } from '@angular/common/http';
//import { RouterModule  } from "@angular/router";
import { RegisterPage  } from '../register/register';
import { ForgotPasswordPage  } from '../forgot-password/forgot-password';
import { NavController,App} from 'ionic-angular';
import { Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController,MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  text: string;
  email: string;
  error_msg: any;
  pass: string;
  glo_user_token:'glo_user_token';
user_token:any;
displaymatch:any;
baseurl:any;
validate_log:any;
LoginValidate:FormGroup;
  constructor(public fb: Facebook,private googlePlus: GooglePlus,private navCtrl:NavController,public app:App,public http: Http,private formBuilder: FormBuilder, public menuCtrl: MenuController ) {
    
    this.text = 'Hello World';
	// this.baseurl='https://vlive11.com/api/';
	// this.baseurl='http://sportsfantasy24.com/api/';
	this.baseurl='http://loot11.com/api/';  
	localStorage.setItem('global_baseurl',this.baseurl);
	this.validate_log=localStorage.getItem('glo_user_token');
	var global_baseurl=localStorage.getItem('global_baseurl');
	var postData={
  
}
 var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization', 'Bearer '+this.validate_log);
	const requestOptions = new RequestOptions({ headers: headers });
    this.http.post(global_baseurl+'get-details', postData, requestOptions)
      .subscribe(data => {
		
	 if(JSON.parse(data['_body']).success)
	{
		 this.navCtrl.setRoot(HomeFooterPage);
	}
	  });	
	  
	  
	  
	   this.LoginValidate = this.formBuilder.group({

    email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
	   pass: ['',Validators.compose([Validators.required])]
	  
	   });
	  
	  
	  
	  
	  
	  
	  
  }
  
  ionViewDidEnter() {
    this.menuCtrl.swipeEnable(false);
 
    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }
 
  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menuCtrl.swipeEnable(true);
 
    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
   }
  
  
  
ionViewDidLoad() {
	var postData={
  
}
var global_baseurl=localStorage.getItem('global_baseurl');
	 this.http.post(global_baseurl+'site_set', postData)
      .subscribe(data => {
		  console.log(JSON.parse(data['_body']));
		  localStorage.setItem('site_name',JSON.parse(data['_body']).data.site_name);
		  this.displaymatch = JSON.parse(data['_body']).data.site_logo;
		  console.log(this.displaymatch)
	  });
}

  onSubmit() {
    
    let user =this.LoginValidate.controls['email'].value;
    let pass =this.LoginValidate.controls['pass'].value;
    // console.log(user)
    // console.log(pass)
var postData={
  "email": user,
  "password":pass
}



 var global_baseurl=localStorage.getItem('global_baseurl');
    this.http.post(global_baseurl+'login', postData)
      .subscribe(data => {
     
		 
		console.log(data);

			 //var displaymatch = JSON.parse(data['_body']).data;
if(JSON.parse(data['_body']).status=='success'){
		
let user_token=JSON.parse(data['_body']).data.token;
localStorage.setItem('glo_user_token',user_token);
 
  this.navCtrl.setRoot(HomeFooterPage);
 
}
else if(JSON.parse(data['_body']).status=='error')
{
  this.error_msg=JSON.parse(data['_body']).data.message;
  console.log(this.error_msg);
} 
else
{
	
}
});

/* if(user=="ragavi@gmail.com" && pass=="123456"){
  this.navCtrl.setRoot(DasbordPage);
} */
//this.navCtrl.setRoot(HomePage);

  }
 Goto_register(){
   // this.navCtrl.setRoot(RegisterPage);
 this.app.getRootNavs()[0].push(RegisterPage);

  }
  
  forgot_password()
  {
  
   //this.navCtrl.setRoot(ForgotPasswordPage);
   this.app.getRootNavs()[0].push(ForgotPasswordPage);
  
  }
   fb_login(){

  this.fb.getLoginStatus().then((res) => {
    if (res.status === 'connected') {
       
       //console.log('Connected.. logging into Facebook ',JSON.stringify(res));

        this.fb.api('/' + res.authResponse.userID + '?fields=id,name,gender,email',[]).then((response)=>{
          //alert("already connected fb response "+JSON.stringify(response));
                  //  console.log("already connected fb response "+JSON.stringify(response));
					
					//alert('Mesuccess__'+JSON.stringify(response));
					
					
					
			var postData={
  
  
  "email": response.email,
  "name": response.name,
  "id": response.id
  //"accessToken":pass

  
  
  }
			  
			  
			  var global_baseurl=localStorage.getItem('global_baseurl');
    this.http.post(global_baseurl+'social_login', postData)
      .subscribe(data => {
    // alert('post___sucess');
		 
		// alert('post___sucess');
if(JSON.parse(data['_body']).status=='success'){
	
	 //alert('poststatus___sucess');
		
let user_token=JSON.parse(data['_body']).data.token;
localStorage.setItem('glo_user_token',user_token);
 
  this.navCtrl.setRoot(HomeFooterPage);
 
}
else if(JSON.parse(data['_body']).status=='error')
{
	
	//alert('poststatus___error');
  this.error_msg=JSON.parse(data['_body']).data.message;
 // console.log(this.error_msg);
} 
else
{
	
}
});		
					
		
        }, (error) => {
			
			alert(JSON.stringify(error));
          console.log("already connected fb response error "+error);
                              // this.socialLoginAPICalling();

        })

    } else {
      
      // console.log('Elseee Connected.. logging into Facebook ',JSON.stringify(res));

       this.fb.login(['public_profile', 'email'])
  .then((res: FacebookLoginResponse) => { 
    console.log('Logged into Facebook!', res);

        this.fb.api('/' + res.authResponse.userID + '?fields=id,name,gender,email',[]).then((response)=>{

           // console.log("Newly connected api response "+JSON.stringify(response));
		//alert('success1'+JSON.stringify(response));
            
			// alert('post1___sucess');
			
			
			
			
			  
			  var postData={
  
  
  "email": response.email,
  "name": response.name,
  "id": response.id
  //"accessToken":pass

  
  
  }
			  
			  
			  var global_baseurl=localStorage.getItem('global_baseurl');
    this.http.post(global_baseurl+'social_login', postData)
      .subscribe(data => {
     
		 
		//console.log(JSON.parse(data['_body']).data.token);

			 //var displaymatch = JSON.parse(data['_body']).data;
if(JSON.parse(data['_body']).status=='success'){
	
	 //alert('post1status___sucess');
		
let user_token=JSON.parse(data['_body']).data.token;
localStorage.setItem('glo_user_token',user_token);
 
  this.navCtrl.setRoot(HomeFooterPage);
 
}
else if(JSON.parse(data['_body']).status=='error')
{
	
	 alert('post1status___error');
  this.error_msg=JSON.parse(data['_body']).data.message;
  console.log(this.error_msg);
} 
else
{
	
}
});
			  
                                


        }, (error) => {
			
			//alert(JSON.stringify(error));
          console.log("Newly connected api response error "+error);
        })

  })
  .catch(e => {
  
  alert('error__'+JSON.stringify(e));
//alert(e);
  
  
  });
 // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);

    }
});
}


google_login()
{
//alert('hai');


this.googlePlus.login({})
  .then(res => {
	 // console.log(res)
	 // alert('success__'+JSON.stringify(res));
	 
	   var postData={
  
  
  "email": res.email,
  "name": res.displayName,
  "id": res.UserId
  //"accessToken":pass

  
  
  }
	 
	 
	 
	  var global_baseurl=localStorage.getItem('global_baseurl');
    this.http.post(global_baseurl+'google_login', postData)
      .subscribe(data => {
     
		 
		//console.log(JSON.parse(data['_body']).data.token);

			 //var displaymatch = JSON.parse(data['_body']).data;
if(JSON.parse(data['_body']).status=='success'){
	
	 //alert('post1status___sucess');
		
let user_token=JSON.parse(data['_body']).data.token;
localStorage.setItem('glo_user_token',user_token);
 
  this.navCtrl.setRoot(HomeFooterPage);
 
}
else if(JSON.parse(data['_body']).status=='error')
{
	
	 //alert('post1status___error');
  this.error_msg=JSON.parse(data['_body']).data.message;
  console.log(this.error_msg);
} 
else
{
	
}
});
	 
	 
	 
	 
	  })
  .catch(err =>{ 
  console.error(err)
   alert('error__'+JSON.stringify(err));
  });






}
  
  
}
