import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController, Platform } from '@ionic/angular';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    }
  ];

  isLight = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private themeService: ThemeService
  ) {
    this.initializeApp();
    console.log(`Is Light Mode: ${this.isLight}`);
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      //this.splashScreen.hide();
      this.authService.getToken();
    });
  }

  async logout() {
    await this.authService.logout()
    this.alertService.presentToast('Logged Out');    
    this.navCtrl.navigateRoot('/landing');
  }

  async toggleTheme() {
    console.log("toggling theme");
    await this.themeService.toggle();
  }
}
