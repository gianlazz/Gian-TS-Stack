import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
})
export class DeleteAccountPage implements OnInit {

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

  async deleteAccount(form: NgForm) {    
    const result = await this.profileService.deleteAccount(form.value.email, form.value.password);
    if (result) {
      this.alertService.presentToast("Deleted account.");
      this.dismiss();
    } else {
      this.alertService.presentRedToast("Failed to delete account.");
    }
  }

}
