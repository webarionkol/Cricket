import { Component } from '@angular/core';
import { NewTransactionPage } from '../instamojo/new_transaction';
 
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { PaymentTransactionPage } from '../payment-transaction/payment-transaction';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { Http, Headers , Response,RequestOptions} from '@angular/http';
import Instamojo from 'instamojo-nodejs';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {HTTP} from '@ionic-native/http';
/**
 * Generated class for the PaymentGatewayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-gateway',
  templateUrl: 'payment-gateway.html', 
})
export class PaymentGatewayPage {

  newTransaction() {
    this.navCtrl.push(NewTransactionPage, {
      amount: 10
    });
  }

  

amount:any;
glo_user_token_v:any;
  glo_user_token='glo_user_token';
baseurl:any;
success_msg:any;
error_msg:any;
mypaypal:any;
mypaypal_status:any;
myinsta_status:any;
razer_status:any;
razer_key:any;
pay_det:any;
pay:any;
instamojoClient;
  constructor(public navCtrl: NavController,private iab: InAppBrowser, private https: HTTP , public navParams: NavParams,public app:App,public http:Http,private payPal: PayPal) {
	  
	  this.amount=navParams.get('payment_amount');
	  this.mypaypal=localStorage.getItem('paypal_cred');
	  this.mypaypal_status=localStorage.getItem('paypal_stat');
	  this.myinsta_status=localStorage.getItem('insta_stat');
	  this.myinsta_status=localStorage.getItem('razer_status');
	  this.razer_status=localStorage.getItem('razer_status');
	  this.razer_key=localStorage.getItem('razer_key');
	  
	  
	  
	  
	    this.baseurl=localStorage.getItem('global_baseurl');
		
	  
	   this.instamojoClient = new Instamojo(https, iab, 'https://vlive11.com/insta/access_token.php');
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad PaymentGatewayPage');
  }
  
  
  instamojo() {
    /* this.navCtrl.push(NewTransactionPage, {
      amount: 10
    }); */
	
	
	 var data = this.instamojoClient.getPaymentFields();
    data.purpose = "wallet";            // REQUIRED
    data.amount =this.amount;                  // REQUIRED
    
    // do not change this
   data.redirect_url = "http://localhost";
   
    this.instamojoClient.payNow(data).then(response => {
		//this.iab.close();
      // alert("Payment complete: " + JSON.stringify(response));
	   
	   
	   
	   
	 
	   let mydata=response;
	   
	   
	   this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
    headers.append("Accept", 'application/json');

    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });
	
			


	let postData={
	'payment_amount':mydata.amount,
	't_id':mydata.id,
	'state':mydata.status
	

   }
   // alert(JSON.stringify(postData));
	 this.http.post(this.baseurl+"insta_success",postData,requestOptions)
       .subscribe(data => {
		
		  
		  // alert('ddsuccess__'+JSON.stringify(data));
		   
		     if(JSON.parse(data['_body']).status=='success')
        {

	 
    
	  
		 // alert('success__'+JSON.stringify(data));

	this.navCtrl.setRoot(PaymentTransactionPage,{my_data:postData});


        }else if(JSON.parse(data['_body']).status=='error')
        {
//alert('error__'+data);
       //   this.error_msg=JSON.parse(data['_body']).data.message;
 //alert('error__'+JSON.stringify(data));

        }
	   });
	   
	   
	   
	   
	   
    }).catch(err => {
       alert("Payment failed: " + JSON.stringify(err));
      throw err;
    });
    //call the Safari View Controller

    // end of safari view controller
	
	
  }
  
  
  razerpay()
  {
  
   var options = {
      description: 'Loot11',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key:this.razer_key,
      amount: this.amount*100,
      name: 'foo',
      prefill: {
        email: 'demo@email.com',
        contact: '1234567890',
        name: 'My Name'
      },
      theme: {
        color: '#F37254'
      },
      modal: {
        ondismiss: function() {
          alert('dismissed')
        }
      }
    };

   var successCallback =(success) =>{
     //alert('payment_id: ' +success.razorpay_payment_id);
	 






	 let transaction_id=success.razorpay_payment_id;
	  
	  
	  
	  	   this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
    headers.append("Accept", 'application/json');

    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });
	
			


var site_url=localStorage.getItem('global_baseurl')


	let postData={
	't_id':success.razorpay_payment_id,
	'payment_amount':this.amount,
	'state':'success'
	
	
	

   }
    
	 this.http.post(site_url+"razor_success",postData,requestOptions)
       .subscribe(data => {
		
		
		   
		   
		     if(JSON.parse(data['_body']).status=='success')
        {

	
    this.navCtrl.setRoot(PaymentTransactionPage,{my_data:postData});
	  
		  


        }else if(JSON.parse(data['_body']).status=='error')
        {



        }
	   });
	  
	  
	  
    };

    var cancelCallback = (error) => {
      //alert(error.description + ' (Error ' + error.code + ')');
	  let postData1={
	't_id': error.code,
	'payment_amount':this.amount,
	'state':'failure'
	
	
	

   }
    this.navCtrl.setRoot(PaymentTransactionPage,{my_data:postData1});
   
   
	  
    };

    RazorpayCheckout.on('payment.success', successCallback)
RazorpayCheckout.on('payment.cancel', cancelCallback)
RazorpayCheckout.open(options)
  }
  
  
  
  
  
  paypal()
  {
 
	   
	   this.payPal.init({
  PayPalEnvironmentProduction:this.mypaypal,
  PayPalEnvironmentSandbox: 'Ae2g8eo_IEirTUyN8YEetEpyeZbsK1IctcZOjT5cdR1PQzHm62I9FeLBcq1QInJb3bid8W0_2iummGk4'
}).then(() => {
  // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
  this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
    // Only needed if you get an "Internal Service Error" after PayPal login!
    //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
  })).then(() => {
    let payment = new PayPalPayment(this.amount, 'INR', 'Description', 'sale');
    this.payPal.renderSinglePaymentUI(payment).then((response) => {
		
	//	alert(JSON.stringify(response));
		
		this.pay=response.response;
		
		
		//alert(this.pay.id);
		this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
    headers.append("Accept", 'application/json');

    headers.append('Authorization', 'Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });
	
			


	let postData={
	'payment_amount':this.amount,
	't_id':this.pay.id,
	'state':this.pay.state
	

   }
   // alert(JSON.stringify(postData));
	 this.http.post(this.baseurl+"paypal_success",postData,requestOptions)
       .subscribe(data => {
		
		  
		   
		   
		     if(JSON.parse(data['_body']).status=='success')
        {

	 
    this.navCtrl.setRoot(PaymentTransactionPage,{my_data:postData});
	  
		  


        }else if(JSON.parse(data['_body']).status=='error')
        {
//alert('error__'+data);
       //   this.error_msg=JSON.parse(data['_body']).data.message;


        }
       });
		
	
	  
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
  
  paypal1()
  {
	  
	  let postData={
	'payment_amount':"100",
	't_id':"100",
	'state':"state"
	

   }
	  
	   this.navCtrl.setRoot(PaymentTransactionPage,{my_data:postData});
	  
  }
  
  
  
  
  
  

}
