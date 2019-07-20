import "axios";
import Axios from "axios";
import { User } from "../dal/entity/user";

export class NotificationService {
    public serverKey: string;
    public sendEndpoint = "https://fcm.googleapis.com/fcm/send";

    public async sendPushToUser(userId: number, title: string, body: string, clickAction: string) {
        const user = await User.findOne({
            where: {id: userId},
            relations: ["userDevices"]
        });
        const fcmUserTokens = [];

        for (const iterator of user.userDevices) {
            fcmUserTokens.push(iterator.fcmPushUserToken);
        }

        for (const iterator of fcmUserTokens) {
            const notification = {
                notification: {
                    title,
                    body,
                    click_action: clickAction
                },
                to: iterator
            };

            await Axios.get(this.sendEndpoint, {
                data: notification
            });
        }
    }
}
