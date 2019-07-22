import { Injectable } from '@angular/core';
import {firebase} from '@firebase/app';
import '@firebase/messaging';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  firebaseConfig = {
    apiKey: "AIzaSyBBglG9CZgnduympgyS4mjSwVR8apl2Ztw",
    authDomain: "stack-push-notifications.firebaseapp.com",
    databaseURL: "https://stack-push-notifications.firebaseio.com",
    projectId: "stack-push-notifications",
    storageBucket: "",
    messagingSenderId: "770608014197",
    appId: "1:770608014197:web:95204a00ce87de89",
    vapidKey: 'BIt104gFwsv7X4-5R9vW9RIGV1TtMUHvRFsrMWWI5ez162UkiKbJpQL6Iq9n_ELYqG6FiTNLFQWidq-Kid6s9EE'
  };

  constructor(
    private apollo: Apollo
  ) { }

  firebaseInitApp() {
    firebase.initializeApp(this.firebaseConfig);
  }

  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        navigator.serviceWorker.ready.then((registration) => {
            // Don't crash an error if messaging not supported
            if (!firebase.messaging.isSupported()) {
                   resolve();
                   return;
            }

            const messaging = firebase.messaging();

            // Register the Service Worker
            messaging.useServiceWorker(registration);

            // Initialize your VAPI key
            messaging.usePublicVapidKey(
                  this.firebaseConfig.vapidKey
            );

            // Optional and not covered in the article
            // Listen to messages when your app is in the foreground
            messaging.onMessage((payload) => {
                console.log(payload);
            });
            // Optional and not covered in the article
            // Handle token refresh
            messaging.onTokenRefresh(() => {
                messaging.getToken().then(
                (refreshedToken: string) => {
                    console.log(refreshedToken);
                }).catch((err) => {
                    console.error(err);
                });
            });

            resolve();
        }, (err) => {
            reject(err);
        });
    });
  }

  requestPermission(): Promise<void> {
    return new Promise<void>(async (resolve) => {
        if (!Notification) {
            resolve();
            return;
        }
        if (!firebase.messaging.isSupported()) {
            resolve();
            return;
        }
        try {
            const messaging = firebase.messaging();
            await messaging.requestPermission();

            const token: string = await messaging.getToken();

            console.log('User notifications token:', token);

            await this.submitNotificationToken(token);
        } catch (err) {
            // No notifications granted
        }

        resolve();
    });
  }

  private async submitNotificationToken(token: string) {
    const result = await this.apollo.mutate({
      mutation: gql`
        mutation {
          addUserFcmNotificationToken(token: "${token}")
        }
      `
    }).toPromise();

    if (result.data.addUserFcmNotificationToken) {
      console.log("addUserFcmNotificationToken successful.");
    } else {
      console.error("addUserFcmNotificationToken failed!");
    }
  }
  
}
