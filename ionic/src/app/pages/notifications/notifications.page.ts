import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  loading = false;

  constructor() { }

  ngOnInit() {
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.loading = true;

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.loading = false;
    }, 2000);
  }

}
