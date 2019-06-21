import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: User;
  
  constructor(
    private menu: MenuController,
    private authService: AuthService
    ) { 
    this.menu.enable(true);
  }

  async ionViewWillEnter() {
    this.user = await this.authService.user();
  }
  
}
