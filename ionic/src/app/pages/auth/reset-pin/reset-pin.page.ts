import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { PasswordResetPage } from '../password-reset/password-reset.page';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-reset-pin',
  templateUrl: './reset-pin.page.html',
  styleUrls: ['./reset-pin.page.scss'],
})
export class ResetPinPage implements OnInit {

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

  async sendPin(form: NgForm) {
    const result = await this.authService.sendReset(form.value.email);
    if (result) {
      await this.storage.set('resetEmail', form.value.email);
      await this.alertService.presentToast("Email sent.");
      this.dismissLogin();
      const resetModal = await this.modalController.create({
        component: PasswordResetPage
      });
      return await resetModal.present();
    } else {
      this.alertService.presentToast("Email failed to send.");
    }
  }

}
