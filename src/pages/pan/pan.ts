import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { VerifyPage } from '../verify/verify';


/**
 * Generated class for the PanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pan',
  templateUrl: 'pan.html',
})
export class PanPage {
  glo_user_token_v:any;
  glo_user_token='glo_user_token';
  OGOOREGISTER: FormGroup;
  name:any;
  pan_card_no:any;
  date_of_birth:any;
                     state:any;
                     username:any;
                     pan_no:any;
                     dob:any;
                     status:any;
                     message:any;
  success_msg:any;
  error_msg:any;
 baseurl:any;


  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder, public navParams: NavParams,public http:Http) {
		this.baseurl=localStorage.getItem('global_baseurl');

    this.OGOOREGISTER = this.formBuilder.group({

      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      pan_no: ['', Validators.compose([Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]$')])],
      dob: ['', Validators.compose([Validators.required,Validators.minLength(5)])],
      state: ['', Validators.compose([Validators.required])]



    });
  }

  ionViewDidLoad() {


   this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
   var headers = new Headers();
   headers.append("Accept", 'application/json');
   headers.append('Authorization','Bearer '+this.glo_user_token_v);
   const requestOptions = new RequestOptions({ headers: headers });

   let postData={


   }
   this.http.post(this.baseurl+"pan_details",postData ,requestOptions)
      .subscribe(data => {

       //console.log(JSON.parse(data['_body']).data.mobile_status);

       if(JSON.parse(data['_body']).status=='success')
       {
		 //  console.log('anme___'+JSON.parse(data['_body']).data.name);
		//   console.log('pan___'+JSON.parse(data['_body']).data.pan_card_no);

        this.OGOOREGISTER.controls['username'].setValue(JSON.parse(data['_body']).data.name);
        this.OGOOREGISTER.controls['pan_no'].setValue(JSON.parse(data['_body']).data.pan_card_no);
         this.OGOOREGISTER.controls['dob'].setValue(JSON.parse(data['_body']).data.date_of_birth);
         this.OGOOREGISTER.controls['state'].setValue(JSON.parse(data['_body']).data.state);
       this.status=JSON.parse(data['_body']).data.status;
        this.message=JSON.parse(data['_body']).data.message;

       }
      });


  }

  post_details()
  {

    let name= this.OGOOREGISTER.controls['username'].value;
    let pan_no= this.OGOOREGISTER.controls['pan_no'].value;
    let dob= this.OGOOREGISTER.controls['dob'].value;
    let state= this.OGOOREGISTER.controls['state'].value;

    this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization','Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });

    var postData={

      'pan_name':name,
      'card_no':pan_no,
      'dob':dob,
      'state':state,


    }



      console.log(postData);


    this.http.post(this.baseurl+"pan_post",postData ,requestOptions)
       .subscribe(data => {

        //console.log(JSON.parse(data['_body']).data.mobile_status);

        if(JSON.parse(data['_body']).status=='success')
        {

       this.success_msg=JSON.parse(data['_body']).data.message;
       this.navCtrl.setRoot(VerifyPage);


        }else if(JSON.parse(data['_body']).status=='error')
        {

          this.error_msg=JSON.parse(data['_body']).data.message;


        }
       });



  }




}
