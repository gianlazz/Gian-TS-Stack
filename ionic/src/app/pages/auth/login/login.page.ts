import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';

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

  async login(form: NgForm) {
    const result = await this.authService.login(form.value.email, form.value.password)
    if (result) {
      this.alertService.presentToast("Logged In");
      this.dismissLogin();
      await this.navCtrl.navigateRoot('/dashboard');
    }
  }
}
