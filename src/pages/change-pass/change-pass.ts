import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ProfilePage } from '../profile/profile';
import { Http, Headers,RequestOptions} from '@angular/http';
/**
 * Generated class for the ChangePassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-pass',
  templateUrl: 'change-pass.html',
})
export class ChangePassPage {
  glo_user_token_v:any;
  glo_user_token='glo_user_token';
  new_password:string;
  confirm_password:string;
  success_msg:any;
  error_msg:any;
  PasswordValidate:FormGroup;
  baseurl:any;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams, public view: ViewController,
    public http:Http,
    private formBuilder: FormBuilder) {
this.baseurl=localStorage.getItem('global_baseurl');


      this.PasswordValidate = this.formBuilder.group({


        new_password: ['', Validators.compose([Validators.required])],
        confirm_password: ['', Validators.compose([Validators.required])]



      });
  }

  ionViewDidLoad() {
    
  }


  update_password()
{
let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/loader.gif" />`
      //duration: 5000
    });
    loading.present();
  let new_password= this.PasswordValidate.controls['new_password'].value;
  let confirm_password= this.PasswordValidate.controls['confirm_password'].value;
  this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization','Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });

    var postData={

      'n_password':new_password,
      'c_password':confirm_password,



    }

    this.http.post(this.baseurl+"update_password",postData ,requestOptions)
    .subscribe(data => {

     //console.log(JSON.parse(data['_body']).data.mobile_status);

     if(JSON.parse(data['_body']).status=='success')
     {
loading.dismiss();
    this.success_msg=JSON.parse(data['_body']).data.message;
    this.navCtrl.setRoot(ProfilePage);


     }else if(JSON.parse(data['_body']).status=='error')
     {
loading.dismiss();
       this.error_msg=JSON.parse(data['_body']).data.message;


     }
    });


}



  closeModal()
  {
    this.view.dismiss();
  }

}
