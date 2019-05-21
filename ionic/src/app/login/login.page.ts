import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private apollo: Apollo;
  private email: string = "";
  private password: string = "";

  constructor(apollo: Apollo) {
    this.apollo = apollo;
  }


  ngOnInit() {
  }

  async login() {
    this.apollo.mutate({
      mutation: gql`
        mutation {
          login(password: "${this.password}", email: "${this.email}")
        }
      `
    }).subscribe(res => {
      if (res.data.login !== true) {
        console.log("Login failure");
      } else if (res.data.login === true) {
        console.log("Login successful.");
      }
    });

  }

}
