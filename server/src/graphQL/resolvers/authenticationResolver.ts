import * as bcrypt from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Invite } from "../../dal/entity/invite";
import { User } from "../../dal/entity/user";
import { IMyContext } from "../context.interface";
import { RegisterInput } from "./inputTypes/inputUser";

@Resolver()
export class AuthenticationResolver {

    @Query(() => User, { nullable: true })
    public async me(@Ctx() ctx: IMyContext): Promise<User> {
        if (!ctx.req.cookies["access-token"]) {
            return null;
        }
        const accessToken = ctx.req.cookies["access-token"];
        const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as any;
        return await User.findOne({ where: { id: data.userId}});
    }

    @Mutation(() => Boolean)
    public async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: IMyContext
    ): Promise<boolean> {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return false;
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return false;
        }

        const accessToken = sign({ userId: user.id}, process.env.ACCESS_TOKEN_SECRET);
        ctx.res.cookie("access-token", accessToken);
        return true;
    }

    @Mutation(() => Boolean)
    public async logout(
        @Ctx() ctx: IMyContext
    ): Promise<boolean> {
        ctx.res.cookie("access-token", "", { expires: new Date(Date.now())});
        return true;
    }

    @Mutation(() => Boolean)
    public async register(
        @Arg("data") { firstName, lastName, email, password }: RegisterInput,
        @Ctx() ctx: IMyContext
        ): Promise<boolean> {
        const existingUser = await User.findOne({ where: { email }});
        if (existingUser) {
            return false;
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save();

        const accessToken = sign({ userId: user.id}, process.env.ACCESS_TOKEN_SECRET);
        ctx.res.cookie("access-token", accessToken);

        return true;
    }

    @Authorized()
    @Mutation(() => Invite)
    public async newInvite(
        @Arg("email") email: string
    ): Promise<Invite> {
        try {
            const invite = await Invite.create({
                email
            }).save();
            return invite;
        } catch (error) {
            console.error(error);
        }
    }

}
