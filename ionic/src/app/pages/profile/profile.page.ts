import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { UpdateService } from 'src/app/services/update.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private updateService: UpdateService,
    private alertService: AlertService
    ) { 
    this.menu.enable(true);
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.user = await this.authService.user();
  }

  async checkForUpdates() {
    this.updateService.checkForUpdate();
    console.log('checked for updates');
    await this.alertService.presentToast('Checked for updates.');
  }

}
