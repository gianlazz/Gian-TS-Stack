import { verify } from "jsonwebtoken";
import { Arg, Authorized, Ctx, Int, Mutation, Resolver } from "type-graphql";
import { Location } from "../../dal/entity/location";
import { User } from "../../dal/entity/user";
import { UserLocation } from "../../dal/entity/userLocation";
import { IMyContext } from "../context.interface";

@Resolver()
export class UserLocationResolver {

    @Authorized()
    @Mutation(() => UserLocation)
    public async addNewUserLocation(
        @Arg("locationName") locationName: string,
        @Ctx() ctx: IMyContext
    ): Promise<UserLocation> {
        try {
            const accessToken = ctx.req.cookies["access-token"];
            const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as any;

            const location = await Location.create({ name: locationName }).save();
            let userLocation = await UserLocation.create({
                userId: data.userId,
                locationId: location.id,
            }).save();
            userLocation = await UserLocation.findOne({
                where: { locationId: location.id, userId: data.userId },
                relations: ["location", "user"]
            });

            return userLocation;
        } catch (error) {
            console.error(error);
        }
    }

    @Authorized()
    @Mutation(() => UserLocation)
    public async addNewUserToLocation(
        @Arg("userId", () => Int) userId: number,
        @Arg("locationId", () => Int) locationId: number,
        @Ctx() ctx: IMyContext
    ): Promise<UserLocation> {
        try {
            const userToBeAdded = await User.findOne({ where: { id: userId } });
            if (!userToBeAdded) {
                throw new Error("User not found.");
            }
            let userLocation = await UserLocation.findOne({ where: { userId, locationId }});
            if (!userLocation) {
                throw new Error("User already in that location.");
            }

            userLocation = await UserLocation.create({
                userId,
                locationId
            }).save();
            userLocation = await UserLocation.findOne({
                where: { locationId, userId },
                relations: ["location", "user"]
            });

            return userLocation;
        } catch (error) {
            console.error(error);
        }
    }

}
