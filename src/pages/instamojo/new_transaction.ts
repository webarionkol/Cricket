import {Component} from '@angular/core';
import Instamojo from 'instamojo-nodejs';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {HTTP} from '@ionic-native/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-new-transaction',
  templateUrl: 'new_transaction.html'
})
export class NewTransactionPage {
  amount;
  instamojoClient;

  constructor(private iab: InAppBrowser, private http: HTTP) {
    this.instamojoClient = new Instamojo(http, iab, 'http://loot11.com/insta/access_token.php');
  }

  payNow() {
    var data = this.instamojoClient.getPaymentFields();
    data.purpose = "Test";            // REQUIRED
    data.amount = 9;                  // REQUIRED
    
    // do not change this
    data.redirect_url = "http://localhost";
    this.instamojoClient.payNow(data).then(response => {
      // alert("Payment complete: " + JSON.stringify(response));
    }).catch(err => {
      // alert("Payment failed: " + JSON.stringify(err));
      throw err;
    });
    //call the Safari View Controller

    // end of safari view controller


  }

}
