import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientModule } from '@angular/common/http';
import { SERVER_URL } from 'src/environments/environment';

import { setContext } from "apollo-link-context";
import { Storage, IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(apollo: Apollo, httpLink: HttpLink, storage: Storage) {

    const apolloLink = httpLink.create({ 
      uri: SERVER_URL,
      withCredentials: true
    });

    const auth = setContext((_, { headers }) => {
      const token = storage.get('token');
      if (!token) {
        return {};
      } else {
        return {
          headers: {
            ...headers,
            Authorization: token
          }
        };
      }
    });

    apollo.create({
      link: auth.concat(apolloLink),
      cache: new InMemoryCache(),
    })
  }
}

