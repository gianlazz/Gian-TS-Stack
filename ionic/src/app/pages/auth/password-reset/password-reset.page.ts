import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPinPage } from '../reset-pin/reset-pin.page';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private storage: Storage
    ) { }

  ngOnInit() {
  }

  dismissLogin() {
    this.modalController.dismiss();
  }

  async resetPassword(form: NgForm) {
    const email = await this.storage.get('resetEmail');
    if (email) {
      const result = await this.authService.resetPassword(
        email,
        form.value.newPassword,
        form.value.resetPin
      );
      if (result) {
        await this.alertService.presentToast("Succeeded.");
        this.dismissLogin();
        const loginModal = await this.modalController.create({
          component: LoginPage
        });
        return await loginModal.present();
      } else {
        this.alertService.presentToast("Password reset failed.");
      }
    } else {
      console.error("Something went wrong.");
    }
  }
  
  async resetPinModal() {
    this.dismissLogin();
    const resetPinModal = await this.modalController.create({
      component: ResetPinPage
    });
    return await resetPinModal.present();
  }

}
