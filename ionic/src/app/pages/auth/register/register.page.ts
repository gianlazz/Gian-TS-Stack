import { Component, OnInit } from '@angular/core';
import { LoginPage } from '../login/login.page';
import { NgForm } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  dismissRegister() {
    this.modalController.dismiss();
  }

  async loginModal() {
    this.dismissRegister();
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }

  async register(form: NgForm) {
    const token = await this.authService.register(form.value.fName, form.value.lName, form.value.email, form.value.password);

    if (token) {
      await this.authService.login(form.value.email, form.value.password);
      this.dismissRegister();
      await this.navCtrl.navigateRoot('/home');
      this.alertService.presentToast('Registered Successfully');
    } else {
      this.alertService.presentToast('Registration Failed');
    }
  }

}
