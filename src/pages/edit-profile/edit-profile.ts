import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http, Headers,RequestOptions} from '@angular/http';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  glo_user_token_v:any;
  glo_user_token='glo_user_token';
  name:string;
  gender:string;
  address:string;
  city:string;
  state:string;
  pincode:any;
  phone:any;
  country:any;
  email:any;
  success_msg:any;
  error_msg:any;
  ProfileValidate:FormGroup;
baseurl:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController,public http:Http,
    private formBuilder: FormBuilder) {
this.baseurl=localStorage.getItem('global_baseurl');

    this.ProfileValidate = this.formBuilder.group({

      name: ['', Validators.compose([Validators.pattern('[a-zA-Z]*')])],
      address: ['', Validators.compose([Validators.pattern('[a-zA-Z]*')])],
      city: ['', Validators.compose([Validators.pattern('[a-zA-Z]*')])],
      country: ['', Validators.compose([Validators.pattern('[a-zA-Z]*')])],
      state: ['', Validators.compose([Validators.pattern('[a-zA-Z]*')])],
      pincode: ['', Validators.compose([Validators.maxLength(6)])],
      phone: ['', Validators.compose([Validators.maxLength(10)])],
      gender: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])]



    });







  }

  ionViewDidLoad() {


    console.log('prasad');

   this.glo_user_token_v= localStorage.getItem(this.glo_user_token);  var headers = new Headers();
     headers.append("Accept", 'application/json');
    headers.append('Authorization','Bearer '+this.glo_user_token_v);
     const requestOptions = new RequestOptions({ headers: headers });

     let postData={


   }
    this.http.post(this.baseurl+"profile",postData ,requestOptions)
       .subscribe(data => {



       if(JSON.parse(data['_body']).status=='success')
  {

    this.ProfileValidate.controls['name'].setValue(JSON.parse(data['_body']).data.name);
    this.ProfileValidate.controls['address'].setValue(JSON.parse(data['_body']).data.address);
    this.ProfileValidate.controls['email'].setValue(JSON.parse(data['_body']).data.email);
    this.ProfileValidate.controls['city'].setValue(JSON.parse(data['_body']).data.city);
    this.ProfileValidate.controls['phone'].setValue(JSON.parse(data['_body']).data.mobile_number);
    this.ProfileValidate.controls['pincode'].setValue(JSON.parse(data['_body']).data.pincode);
    this.ProfileValidate.controls['gender'].setValue(JSON.parse(data['_body']).data.gender);
   this.ProfileValidate.controls['state'].setValue(JSON.parse(data['_body']).data.state);
   this.ProfileValidate.controls['country'].setValue(JSON.parse(data['_body']).data.country);





   // this.ProfileValidate.controls['name'].setValue=JSON.parse(data['_body']).data.name;
       // let name=JSON.parse(data['_body']).data.name;
       // let gender=JSON.parse(data['_body']).data.gender;
       //  let address=JSON.parse(data['_body']).data.address;
  //let city=JSON.parse(data['_body']).data.city;
      //   let state=JSON.parse(data['_body']).data.state;
      //   let pincode=JSON.parse(data['_body']).data.pincode;
       //  let phone=JSON.parse(data['_body']).data.phone;
     //    let country=JSON.parse(data['_body']).data.country;
 // let email=JSON.parse(data['_body']).data.email;


         }
       });

  // console.log('ionViewDidLoad EditProfilePage');
  }


  update_profile()
  {

    let name= this.ProfileValidate.controls['name'].value;
    let address= this.ProfileValidate.controls['address'].value;
    let email= this.ProfileValidate.controls['email'].value;
    let city= this.ProfileValidate.controls['city'].value;
    let phone= this.ProfileValidate.controls['phone'].value;
    let pincode= this.ProfileValidate.controls['pincode'].value;
    let gender= this.ProfileValidate.controls['gender'].value;
    let state= this.ProfileValidate.controls['state'].value;
    let country= this.ProfileValidate.controls['country'].value;

    this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Authorization','Bearer '+this.glo_user_token_v);
    const requestOptions = new RequestOptions({ headers: headers });

    var postData={

      'name':name,
      'address':address,
      'email':email,
      'state':state,
      'city':city,
      'phone':phone,
      'pincode':pincode,
      'gender':gender,
      'country':country,


    }



      console.log(postData);


    this.http.post(this.baseurl+"profile_update",postData ,requestOptions)
       .subscribe(data => {

        //console.log(JSON.parse(data['_body']).data.mobile_status);

        if(JSON.parse(data['_body']).status=='success')
        {

       this.success_msg=JSON.parse(data['_body']).data.message;
       this.navCtrl.setRoot(ProfilePage);


        }else if(JSON.parse(data['_body']).status=='error')
        {

          this.error_msg=JSON.parse(data['_body']).data.message;


        }
       });




  }














  closeModal()
  {
    this.view.dismiss();
  }

}
