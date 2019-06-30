import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.page.html',
  styleUrls: ['./change-name.page.scss'],
})
export class ChangeNamePage implements OnInit {

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

  async changeName(form: NgForm) {
    const result = await this.profileService.changeName(form.value.firstName, form.value.lastName);
    if (result) {
      this.alertService.presentToast("Changed name.");
      this.dismiss();
    } else {
      this.alertService.presentRedToast("Failed to change name.");
    }
  }

}
