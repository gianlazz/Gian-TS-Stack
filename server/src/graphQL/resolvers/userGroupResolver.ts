import { verify } from "jsonwebtoken";
import { Arg, Authorized, Ctx, Int, Mutation, Resolver } from "type-graphql";
import { Group } from "../../dal/entity/group";
import { User } from "../../dal/entity/user";
import { UserGroup } from "../../dal/entity/userGroup";
import { IMyContext } from "../context.interface";

@Resolver()
export class UserGroupResolver {

    @Authorized()
    @Mutation(() => UserGroup)
    public async addNewUserGroup(
        @Arg("locationName") locationName: string,
        @Ctx() ctx: IMyContext
    ): Promise<UserGroup> {
        try {
            const accessToken = ctx.req.cookies["access-token"];
            const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as any;

            const group = await Group.create({ name: locationName }).save();
            let userGroup = await UserGroup.create({
                userId: data.userId,
                locationId: group.id,
            }).save();
            userGroup = await UserGroup.findOne({
                where: { locationId: group.id, userId: data.userId },
                relations: ["group", "user"]
            });

            return userGroup;
        } catch (error) {
            console.error(error);
        }
    }

    @Authorized()
    @Mutation(() => UserGroup)
    public async addNewUserToLocation(
        @Arg("userId", () => Int) userId: number,
        @Arg("locationId", () => Int) locationId: number,
        @Ctx() ctx: IMyContext
    ): Promise<UserGroup> {
        try {
            const userToBeAdded = await User.findOne({ where: { id: userId } });
            if (!userToBeAdded) {
                throw new Error("User not found.");
            }
            let userGroup = await UserGroup.findOne({ where: { userId, locationId }});
            if (!userGroup) {
                throw new Error("User already in that group.");
            }

            userGroup = await UserGroup.create({
                userId,
                locationId
            }).save();
            userGroup = await UserGroup.findOne({
                where: { locationId, userId },
                relations: ["group", "user"]
            });

            return userGroup;
        } catch (error) {
            console.error(error);
        }
    }

}
