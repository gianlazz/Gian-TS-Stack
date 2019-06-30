import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private apollo: Apollo
  ) { }

  async changeName(firstName: string, lastName: string): Promise<boolean> {
    const result = await this.apollo.mutate({
      mutation: gql`
        mutation {
          changeName(firstName: "${firstName}", lastName: "${lastName}")
        }
      `
    }).toPromise();

    console.log(result);
    if (result.data.changeName) {
      console.log("Changed name successfully.");
      return true;
    } else {
      console.log("Failed to change name.");
      return false;
    }
  }
  
  async changeEmail(newEmail: string): Promise<boolean> {
    const result = await this.apollo.mutate({
      mutation: gql`
        mutation {
          changeEmail(newEmail: "${newEmail}")
        }
      `
    }).toPromise();

    console.log(result);
    if (result.data.changeEmail) {
      console.log("Changed email successfully");
      return true;
    } else {
      console.log("Failed to change name.");
      return false;
    }
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
    const result = await this.apollo.mutate({
      mutation: gql`
        mutation {
          changePassword(oldPassword: "${oldPassword}", newPassword: "${newPassword}")
        }
      `
    }).toPromise();

    console.log(result);
    if (result.data.changePassword) {
      console.log("Changed password successfully");
      return true;
    } else {
      console.log("Failed to change password.");
      return false;
    }
  }

  async deleteAccount(emailAddress: string, password: string) {
    const result = await this.apollo.mutate({
      mutation: gql`
        mutation {
          deleteAccount(email: "${emailAddress}", password: "${password}")
        }
      `
    }).toPromise();

    console.log(result);
    if (result.data.deleteAccount) {
      console.log("Deleted account successfully");
      return true;
    } else {
      console.log("Failed to delete account.");
      return false;
    }
  }
}
