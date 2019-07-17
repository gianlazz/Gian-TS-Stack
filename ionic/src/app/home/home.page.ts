import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UpdateService } from '../services/update.service';
import { PwaInstallService } from '../services/pwa-install.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: User;
  updateReady = false;
  
  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private updateService: UpdateService,
    private pwaInstallService: PwaInstallService
    ) { 
    this.menu.enable(true);

    this.updateService.checkForUpdate();
    if (this.updateService.swUpdate.isEnabled) {
      this.updateService.updateAvailable = this.updateService.swUpdate.available;
      this.updateService.swUpdate.available.subscribe(() => {
          // if(confirm("New version available. Load New Version?")) {
          //     window.location.reload();
          // }

          this.updateReady = true;
      });
    }

    pwaInstallService.showInstallBanner();
  }

  async ionViewWillEnter() {
    this.user = await this.authService.user();
  }

  update() {
    console.log('updating...');
    this.updateService.updateToLatest();
  }
  
}
