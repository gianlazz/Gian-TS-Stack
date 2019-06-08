import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegisterPage } from '../pages/auth/register/register.page';
import { LoginPage } from '../pages/auth/login/login.page';
import { ResetPinPage } from '../pages/auth/reset-pin/reset-pin.page';
import { PasswordResetPage } from '../pages/auth/password-reset/password-reset.page';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(
    private modalController: ModalController
  ) { }

  async registerModal() {
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  async loginModal() {
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }

  async resetPinModal() {
    const resetModal = await this.modalController.create({
      component: ResetPinPage
    });
    return await resetModal.present();
  }

  async passwordResetModal() {
    const resetModal = await this.modalController.create({
      component: PasswordResetPage
    });
    return await resetModal.present();
  }
  
}
