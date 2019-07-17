import { Component, OnInit } from '@angular/core';
import { LoginPage } from '../login/login.page';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  loading = false;

  myForm: FormGroup;

  get firstName() {
    return this.myForm.get('firstName');
  }

  get lastName() {
    return this.myForm.get('lastName');
  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(8)
      ]]
    })

    this.myForm.valueChanges.subscribe();
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

  async register() {
    this.loading = true;

    const formValue = this.myForm.value;

    const token = await this.authService.register(formValue.fName, formValue.lName, formValue.email, formValue.password);

    if (token) {
      await this.authService.login(formValue.email, formValue.password);
      this.loading = false;
      this.dismissRegister();
      await this.navCtrl.navigateRoot('/home');
      this.alertService.presentToast('Registered Successfully');
    } else {
      this.loading = false;
      this.alertService.presentToast('Registration Failed');
    }
  }

}
