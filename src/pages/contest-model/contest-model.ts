import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http, Headers , Response,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ContestModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contest-model',
  templateUrl: 'contest-model.html',
})
export class ContestModelPage {

  arr = [];
  matchlist = [];
  glo_user_token_v:any;
  glo_user_token='glo_user_token';

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http ,public view: ViewController) {




  }

  closeModal()
  {
    this.view.dismiss();
  }


  ionViewDidLoad() {

    this.glo_user_token_v= localStorage.getItem(this.glo_user_token);
    var headers = new Headers();
     headers.append("Accept", 'application/json');
    headers.append('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYyZTQ0NWQwOTI5NWM0OGUyNjY5YmI4ZmU0ZDMzYWQwMzVjMjQ1ODhkYzU4YjZjNGZmMWM1OTI1YzNhMjNiYmQxNWZhYWFmMDc5YWY1MzBkIn0.eyJhdWQiOiIxIiwianRpIjoiZjJlNDQ1ZDA5Mjk1YzQ4ZTI2NjliYjhmZTRkMzNhZDAzNWMyNDU4OGRjNThiNmM0ZmYxYzU5MjVjM2EyM2JiZDE1ZmFhYWYwNzlhZjUzMGQiLCJpYXQiOjE1NDg3NTk5NzcsIm5iZiI6MTU0ODc1OTk3NywiZXhwIjoxNTgwMjk1OTc3LCJzdWIiOiI0NTU5Iiwic2NvcGVzIjpbXX0.FW5bPFuA2KY0Sfl345X3JRS4apcnNuHZhqnWEqH-IvkyHh_Ws5Y25xYRFb3F_OWJxIRjrY1VLaj_uKkt_tsrsRqhQA96diEAlBEe8x1jZb81u9UwfrREFS-H3-JEOLdPkL93S-KPgF4czMqyOaoYbJv6OWvjCvRD_vuYYSOiOSt0CL48o1t4jZpZJE0GQx7V_cQ36rWKdG0pqf4fzTPC-P0Wxn8jUfiwFLHlfYSJ2VsZI1CBFcRNnod9d7b05tAiLRBrwT4iJg7MFkjSYrE3YfJkCr_CXHTwwlXWfkBbjnxW5LiFhbiUx6D5fjocA69-IfrQ7CV9hQVRfxX9uSgL5kxIAKCCGdHLWK4hf3tD0vE-DZyMoCLXbL0bslJPnETKIet1t_wH5oa81Taq5C10TJKuyvRGjf-qvhIyoRHa4fUpF5vV_TsAKkKLL8bKtigW2VkMfOicbAicW4nsQp-TH8uipNCe7QdUbXFEu1Jj2Xqy5wUMJNzOjoiJ9ZBwIVti22hmgSJXA8mkcJP4xK_eh6sH1w-3UYesoDoNuOfq9Y5L7A0rlMxyYkODSaYCBRKJ7kJwD2uFkbeeW8azXbat2PomL6UG66jqJqresOQYFAiFptsXXtlboQ99viw9ILYKooMq9KAxejL5aDVtPNdtPKkYo9OjHuY5_o7Q2j0nmU0');
    const requestOptions = new RequestOptions({ headers: headers });
    let postData={
      "name": "Customer004",
      "email": "customer004@email.com",
      "tel": "0000252525"

    }

    this.http.post("http://melonetworks.com/fifa/api/get_live_matches",postData ,requestOptions)
       .subscribe(data => {
        var displaymatch = JSON.parse(data['_body']).data;


        var arr = [];

        Object.keys(displaymatch).forEach(function(key)
        {
            arr.push(displaymatch[key]);
          console.log(displaymatch[key]);




        });
        this.matchlist = arr;


       });


    console.log('ionViewDidLoad ContestModelPage');
  }

}
