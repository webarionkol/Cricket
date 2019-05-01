import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams,App } from 'ionic-angular';
import { Http, Headers , Response,RequestOptions} from '@angular/http';
import { ChangeDetectorRef } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { PaymentGatewayPage } from '../payment-gateway/payment-gateway';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';


/**
 * Generated class for the AddCashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-cash',
  templateUrl: 'add-cash.html',
})
export class AddCashPage {
 glo_user_token_v:any;
  glo_user_token='glo_user_token';
baseurl:any;
amount:any;
wallet_amt:any;
my_val:any;
pay_pal:any;
paypal_status:any;
instamojo_status:any;
razerpay_status:any;
razerpay_key:any;
CashValidate:FormGroup;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,private formBuilder: FormBuilder,public app:App,private payPal: PayPal,private cdRef:ChangeDetectorRef ,public navParams: NavParams,public http: Http) {
	  this.baseurl=localStorage.getItem('global_baseurl');
	   this.CashValidate = this.formBuilder.group({

      amount: ['',Validators.compose([Validators.required])]
	  
	   });
	  
	  
	  
	  
  }

  ionViewDidLoad() {
  

  let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/loader.gif" />`
      //duration: 5000
    });
    loading.present();

   
   this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
    headers.append("Accept", 'application/json');

    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });

    let postData={
      "name": "Customer004",
      "email": "customer004@email.com",
      "tel": "0000252525"

    }

    this.http.post(this.baseurl+"view_withdraw",postData ,requestOptions)
       .subscribe(data => {
		 loading.dismiss();
        this.wallet_amt= JSON.parse(data['_body']).data.wallet_amt;
        this.pay_pal= JSON.parse(data['_body']).data.paypal_credential;
        this.paypal_status= JSON.parse(data['_body']).data.settings.pay_pal_status;
        this.razerpay_status= JSON.parse(data['_body']).data.settings.razerpay_status;
        this.razerpay_key= JSON.parse(data['_body']).data.razerpay_key;
		
		//console.log('Status__'+this.paypal_status);
        this.instamojo_status= JSON.parse(data['_body']).data.settings.instamojo_status;
	   localStorage.setItem('paypal_cred',this.pay_pal);
	   localStorage.setItem('paypal_stat',this.paypal_status);
	   localStorage.setItem('insta_stat',this.instamojo_status);
	   localStorage.setItem('razer_status',this.razerpay_status);
	   localStorage.setItem('razer_key',this.razerpay_key);


       });
   
  }
  
  
  getvalue(value)
  {
  
  
  this.my_val=value;
  
   this.CashValidate.controls['amount'].setValue(this.my_val);
   this.cdRef.detectChanges();
  
  }
  
  
  /* insta_pay()
  {
 this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
    headers.append("Accept", 'application/json');

    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });

    let postData={
      "payment_amount":this.amount
      

    }
   this.http.post(this.baseurl+"insta-post",postData ,requestOptions)
       .subscribe(data => {

        this.wallet_amt= JSON.parse(data['_body']).data.wallet_amt;


       }); 
	   
	}    */
	
	
	paypal()
	{
	
	this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
    headers.append("Accept", 'application/json');

    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });
	
	   
	   this.payPal.init({
  PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
  PayPalEnvironmentSandbox: 'Ae2g8eo_IEirTUyN8YEetEpyeZbsK1IctcZOjT5cdR1PQzHm62I9FeLBcq1QInJb3bid8W0_2iummGk4'
}).then(() => {
  // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
  this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
    // Only needed if you get an "Internal Service Error" after PayPal login!
    //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
  })).then(() => {
    let payment = new PayPalPayment(this.amount, 'INR', 'Description', 'sale');
    this.payPal.renderSinglePaymentUI(payment).then(() => {
		
		
		alert(payment);
      // Successfully paid

      // Example sandbox response
      //
      // {
      //   "client": {
      //     "environment": "sandbox",
      //     "product_name": "PayPal iOS SDK",
      //     "paypal_sdk_version": "2.16.0",
      //     "platform": "iOS"
      //   },
      //   "response_type": "payment",
      //   "response": {
      //     "id": "PAY-1AB23456CD789012EF34GHIJ",
      //     "state": "approved",
      //     "create_time": "2016-10-03T13:33:33Z",
      //     "intent": "sale"
      //   }
      // }
	  
	
	  
	  
	  
	  
	  
	  
    }, () => {
      // Error or render dialog closed without being successful
    });
  }, () => {
    // Error in configuration
  });
}, () => {
  // Error in initialization, maybe PayPal isn't supported or something else
});
	   
	   
	} 
	   payment_gateway()
	   {
	   
	 //  let amount=this.amount;
	  // console.log(amount);
	let amount=this.CashValidate.controls['amount'].value;
	//let pay_pal_cred=this.pay_pal;
	//console.log('myamount__'+amount);
	   this.app.getRootNavs()[0].push(PaymentGatewayPage,{payment_amount:amount});
	   
	   }
	   
   
  
  
  


}
