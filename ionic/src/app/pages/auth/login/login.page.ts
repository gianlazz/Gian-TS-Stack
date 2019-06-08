import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LandingService } from 'src/app/services/landing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private landingService: LandingService
    ) { }

  ngOnInit() {
  }

  dismissLogin() {
    this.modalController.dismiss();
  }

  async registerModal() {
    this.dismissLogin();
    return await this.landingService.registerModal();
  }

  async resetModal() {
    this.dismissLogin();
    return await this.landingService.resetPinModal();
  }

  async login(form: NgForm) {
    const token = await this.authService.login(form.value.email, form.value.password);
    console.log("Result: " + token);
    if (token) {
      this.alertService.presentToast("Logged In");
      this.dismissLogin();
      await this.navCtrl.navigateRoot('/dashboard');
    } else {
      this.alertService.presentToast("Login failed!");
    }
  }
}
