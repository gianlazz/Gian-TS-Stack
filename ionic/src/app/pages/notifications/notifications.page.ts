import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { InAppNotification } from 'src/app/models/inAppNotification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  loading = false;

  inAppNotifications: InAppNotification[] = Array.of<InAppNotification>();

  constructor(
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
  }

  async doRefresh(event) {
    console.log('Begin async operation');
    this.loading = true;

    try {
      this.inAppNotifications = await this.notificationsService.getInAppNotifications();

      const notification = new InAppNotification();
      notification.text = "this is test text";
      notification.date = "this is test date";
      notification.thumbnail = "https://ionicframework.com/docs/demos/api/avatar/avatar.svg"
      this.inAppNotifications.push(notification);

      event.target.complete();
      this.loading = false;
    } catch (error) {
      event.target.complete();
      this.loading = false;
    }
  }

}
