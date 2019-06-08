import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LandingService } from 'src/app/services/landing.service';

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
    private storage: Storage,
    private landingService: LandingService
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
      return await this.landingService.passwordResetModal();
    } else {
      this.alertService.presentToast("Email failed to send.");
    }
  }

}
