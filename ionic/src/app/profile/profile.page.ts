import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;

  constructor(
    private menu: MenuController,
    private authService: AuthService
    ) { 
    this.menu.enable(true);
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.user = await this.authService.user();
  }

}
