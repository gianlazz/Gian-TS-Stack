import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LandingService } from 'src/app/services/landing.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private landingService: LandingService
  ) { }

  ngOnInit() {
  }

  dismissRegister() {
    this.modalController.dismiss();
  }

  async loginModal() {
    this.dismissRegister();
    return await this.landingService.loginModal();
  }

  async register(form: NgForm) {
    const token = await this.authService.register(form.value.fName, form.value.lName, form.value.email, form.value.password);

    if (token) {
      await this.authService.login(form.value.email, form.value.password);
      this.dismissRegister();
      await this.navCtrl.navigateRoot('/dashboard');
      this.alertService.presentToast('Registered Successfully');
    } else {
      this.alertService.presentToast('Registration Failed');
    }
  }

}
