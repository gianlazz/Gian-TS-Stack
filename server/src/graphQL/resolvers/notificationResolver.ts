import { verify } from "jsonwebtoken";
import { Arg, Ctx, Mutation, Query, Resolver, Authorized } from "type-graphql";
import { User } from "../../dal/entity/user";
import { UserDevice } from "../../dal/entity/userDevice";
import { NotificationService } from "../../services/notificationService";
import { IMyContext } from "../context.interface";
import { InAppNotifications } from "../../dal/entity/inAppNotifications";

@Resolver()
export class NotificationResolver {

    constructor(
        private notificationService: NotificationService
    ) {}

    @Authorized()
    @Query(() => [InAppNotifications])
    public async getInAppNotifications(
        @Ctx() ctx: IMyContext,
    ): Promise<InAppNotifications[]> {
        let accessToken = ctx.req.cookies["access-token"];
        if (!accessToken) {
            accessToken = ctx.req.get("Authorization");
        }
        if (!accessToken) {
            console.error("Didn't find access token!");
        }

        const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as any;
        return await InAppNotifications.find({ where: { userId: data.userId}});
    }

    @Authorized()
    @Mutation(() => Boolean)
    public async addUserFcmNotificationToken(
        @Ctx() ctx: IMyContext,
        @Arg("token") token: string
    ): Promise<boolean> {
        let accessToken = ctx.req.cookies["access-token"];
        if (!accessToken) {
            accessToken = ctx.req.get("Authorization");
        }
        if (!accessToken) {
            console.error("Didn't find access token!");
        }

        const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as any;
        const user = await User.findOne({ where: { id: data.userId}});

        const userDevice = new UserDevice();
        userDevice.userId = user.id;
        userDevice.fcmPushUserToken = token;
        const result = await userDevice.save();
        console.log(result);

        return true;
    }

    @Query(() => Boolean)
    public async sendPushNotification(
        @Arg("userId") userId: number,
    ) {
        await this.notificationService.sendPushToUser(
            userId,
            "this is a test push message",
            `this is a test push message`,
            ""
            );

        return true;
    }

}
