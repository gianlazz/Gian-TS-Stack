import { Component, OnInit, Input, HostListener } from '@angular/core';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-pro-sign-up',
  templateUrl: './pro-sign-up.page.html',
  styleUrls: ['./pro-sign-up.page.scss'],
})
export class ProSignUpPage implements OnInit {

  @Input()
  amount = 300;

  @Input()
  description;

  handler: StripeCheckoutHandler;

  confirmation: any;
  loading = false;

  constructor() { }

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: '',
      image: '',
      locale: 'auto',
      source: async (source) => {
        this.loading = true
        //const user = await this.auth.getUser();
        //const fun = this.functions.httpsCallable('StripCreateCharge');
        //this.confirmation = await fun({ source: source.id, uid: user.id, amount: this.amount  }).toPromise();
        //this.loading = false;
      }
    });
  }

  async checkout(e) {
    //const user = await this.auth.getUser();
    this.handler.open({
      name: '',
      //description: this.description,
      amount: this.amount,
      //email: user.email
    })
    e.preventDefault();
  }

  /*
  @HostListener('window:popstate') {
    onPopSate() {
      this.handler.close();
    }
  }
  */

}
