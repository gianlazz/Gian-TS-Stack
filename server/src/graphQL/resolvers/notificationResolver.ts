import { verify } from "jsonwebtoken";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../dal/entity/user";
import { UserDevice } from "../../dal/entity/userDevice";
import { NotificationService } from "../../services/notificationService";
import { IMyContext } from "../context.interface";

@Resolver()
export class NotificationResolver {

    constructor(
        private notificationService: NotificationService
    ) {}

        // @Authorized()
        @Mutation(() => Boolean)
        public async addUserFcmNotificationToken(
            @Ctx() ctx: IMyContext,
            @Arg("token") token: string
        ): Promise<boolean> {
            try {
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
            } catch (error) {
                return false;
            }
        }

        @Query(() => Boolean)
        public async sendNotification(
            @Arg("userId") userId: number,
        ) {
            try {
                await this.notificationService.sendPushToUser(
                    userId,
                    "this is a test push message",
                    `this is a test push message`,
                    ""
                    );
            } catch (error) {
                return false;
            }
            
            return true;
        }

}
