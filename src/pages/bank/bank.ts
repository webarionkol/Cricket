import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController ,NavParams } from 'ionic-angular';
import { Http, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { VerifyPage } from '../verify/verify';

/**
 * Generated class for the BankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bank',
  templateUrl: 'bank.html',
})
export class BankPage {

  mobilestatus:any;
  panstatus:any;
  banstatus:any;
  glo_user_token_v:any;
  glo_user_token='glo_user_token';
 baseurl:any;
 error_msg:any;
 success_msg:any;
 all_data:any;
 bankValidate:FormGroup;
 
		 	bankname:any;
			branchname:any;
			acc_no:any;
			acc_holder_name:any;
			ifsc:any;
			

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,private formBuilder: FormBuilder, public navParams: NavParams,public http: Http) {
   this.baseurl=localStorage.getItem('global_baseurl');
   
   
    this.bankValidate = this.formBuilder.group({

      bankname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      branchname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      acc_no: ['', Validators.compose([Validators.required,Validators.maxLength(10)])],
      acc_holder_name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      ifsc: ['', Validators.compose([Validators.required])]



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
    headers.append('Authorization','Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });

    let postData={
      "name": "Customer004",
      "email": "customer004@email.com",
      "tel": "0000252525"

    }
    this.http.post(this.baseurl+"bank_verify",postData ,requestOptions)
       .subscribe(data => {

      loading.dismiss();
		this.all_data=JSON.parse(data['_body']).data;

       this.mobilestatus = this.all_data.mobile_status;
       this.panstatus = this.all_data.pancard_verify_status;
       this.banstatus = this.all_data.bank_verify_status;
      
		
		
		
		
		
		 this.bankValidate.controls['bankname'].setValue(JSON.parse(data['_body']).data.bank_name);
       this.bankValidate.controls['branchname'].setValue(JSON.parse(data['_body']).data.branch_name);
        this.bankValidate.controls['acc_no'].setValue(JSON.parse(data['_body']).data.acc_no);
        this.bankValidate.controls['acc_holder_name'].setValue(JSON.parse(data['_body']).data.bank_holder_name);
         this.bankValidate.controls['ifsc'].setValue(JSON.parse(data['_body']).data.ifsc_code);
        
		
		
		


       });


  }
  
  
  bank_post()
  {
  

 
	  let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/loader.gif" />`
      //duration: 5000
    });
    loading.present();



  let bname= this.bankValidate.controls['bankname'].value;
    let branch_name= this.bankValidate.controls['branchname'].value;
  
    let bacc_no= this.bankValidate.controls['acc_no'].value;
    let bholder_name= this.bankValidate.controls['acc_holder_name'].value;
    let ifsc_code= this.bankValidate.controls['ifsc'].value;
   
  this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization','Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });

    let postData={
      "bank_name": bname,
      "branch_name":branch_name,
      "account_no": bacc_no,
      "acc_holder_name": bholder_name,
      "ifsc": ifsc_code,

    }
	
	  this.http.post(this.baseurl+"bank_post",postData ,requestOptions)
       .subscribe(data => {

        //console.log(JSON.parse(data['_body']).data.mobile_status);

        if(JSON.parse(data['_body']).status=='success')
        {
 loading.dismiss();
       this.success_msg=JSON.parse(data['_body']).data.message;
       this.navCtrl.setRoot(VerifyPage);


        }else if(JSON.parse(data['_body']).status=='error')
        {
 loading.dismiss();
          this.error_msg=JSON.parse(data['_body']).data.message;


        }
       });
	
  
  
  
  }
  
  
  
  

}
