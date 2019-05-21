import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  private apollo: Apollo;
  private username: string = "";
  private email: string = "";
  private password: string = "";

  constructor(apollo: Apollo) {
    this.apollo = apollo;
  }

  ngOnInit() {
  }

  async register() {
    this.apollo.mutate({
      mutation: gql`
        mutation {
          register(data: {
            username: "${this.username}",
            email: "${this.email}",
            password: "${this.password}"
          })
        }
      `
    }).subscribe(res => {
      if (res.data.register !== true) {
        console.log("Registration failure");
      } else if (res.data.register === true) {
        console.log("Registration successful.");
      }
    });
  }
  
}
