import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { PasswordResetPage } from '../password-reset/password-reset.page';
import { ResetPinPage } from '../reset-pin/reset-pin.page';
import { isNullOrUndefined } from 'util';

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
    private alertService: AlertService
    ) { }

  ngOnInit() {
  }

  dismissLogin() {
    this.modalController.dismiss();
  }

  async registerModal() {
    this.dismissLogin();
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  async resetModal() {
    this.dismissLogin();
    const resetModal = await this.modalController.create({
      component: ResetPinPage
    });
    return await resetModal.present();
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
