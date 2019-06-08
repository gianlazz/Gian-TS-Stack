import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LandingService } from 'src/app/services/landing.service';

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
    private storage: Storage,
    private landingService: LandingService
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
        return await this.landingService.loginModal();
      } else {
        this.alertService.presentToast("Password reset failed.");
      }
    } else {
      console.error("Something went wrong.");
    }
  }
  
  async resetPinModal() {
    this.dismissLogin();
    return await this.landingService.resetPinModal();
  }

}
