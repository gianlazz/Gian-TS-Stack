import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
})
export class DeleteAccountPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private profileService: ProfileService,
    private alertService: AlertService,
    private storage: Storage,
    private authService: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async deleteAccount(form: NgForm) {    
    const result = await this.profileService.deleteAccount(form.value.email, form.value.password);
    if (result) {
      await this.storage.clear();
      await this.authService.logout();
      this.modalController.dismiss();
      this.alertService.presentToast("Deleted account.");
      this.navCtrl.navigateRoot('/landing');
    } else {
      this.alertService.presentRedToast("Failed to delete account.");
    }
  }

}
