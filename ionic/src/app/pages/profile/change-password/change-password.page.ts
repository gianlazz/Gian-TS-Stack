import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private profileService: ProfileService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async changePassword(oldPassword: string, newPassword: string) {
    const result = await this.profileService.changePassword(oldPassword, newPassword);
    if (result) {
      this.alertService.presentToast("Changed password.");
    } else {
      this.alertService.presentRedToast("Failed to change password.");
    }
  }

}
