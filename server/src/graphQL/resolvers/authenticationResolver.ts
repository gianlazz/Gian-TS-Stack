import * as bcrypt from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Invite } from "../../dal/entity/invite";
import { PasswordReset } from "../../dal/entity/passwordReset";
import { User } from "../../dal/entity/user";
import { EmailService } from "../../services/emailService";
import { IMyContext } from "../context.interface";
import { RegisterInput } from "./inputTypes/inputUser";

@Resolver()
export class AuthenticationResolver {

    constructor(private emailService: EmailService) {}

    @Authorized()
    @Query(() => User, { nullable: true })
    public async me(@Ctx() ctx: IMyContext): Promise<User> {
        let accessToken = ctx.req.cookies["access-token"];
        if (!accessToken) {
            accessToken = ctx.req.get("Authorization");
        }
        if (!accessToken) {
            console.error("Didn't find access token!");
        }

        const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as any;
        return await User.findOne({ where: { id: data.userId}});
    }

    @Mutation(() => String, { nullable: true })
    public async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: IMyContext
    ): Promise<string> {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return null;
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return null;
        }

        const accessToken = sign({ userId: user.id}, process.env.ACCESS_TOKEN_SECRET);
        ctx.res.cookie("access-token", accessToken);

        return accessToken;
    }

    @Mutation(() => String, { nullable: true })
    public async register(
        @Arg("data") { firstName, lastName, email, password }: RegisterInput,
        @Ctx() ctx: IMyContext
        ): Promise<string> {
        const existingUser = await User.findOne({ where: { email }});
        if (existingUser) {
            return null;
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

        return accessToken;
    }

    @Mutation(() => Boolean)
    public async logout(
        @Ctx() ctx: IMyContext
    ): Promise<boolean> {
        ctx.res.cookie("access-token", "", { expires: new Date(Date.now())});
        return true;
    }

    @Mutation(() => Boolean)
    public async resetPassword(
        @Arg("usersEmail") usersEmail: string,
        @Arg("resetPin") resetPin: string,
        @Arg("newPassword") newPassword: string,
    ): Promise<boolean> {
        const user = await User.findOne({ email: usersEmail });
        const passwordReset = await PasswordReset.findOne({
            userId: user.id,
            pin: parseInt(resetPin, 10)
        });

        if (passwordReset) {
            const hashedPassword = await bcrypt.hash(newPassword, 12);
            user.password = hashedPassword;
            await user.save();
            return true;
        } else {
            return false;
        }
    }

    @Mutation(() => Boolean)
    public async sendPasswordResetEmail(
        @Arg("email") email: string
    ): Promise<boolean> {
        const user = await User.findOne({ email });

        if (user) {
            const pin = await this.emailService.sendPasswordResetEmail(user.email, `${user.firstName} ${user.lastName}`);
            let passwordReset = await PasswordReset.create({ userId: user.id, pin });
            passwordReset = await passwordReset.save();
            return true;
        } else {
            return false;
        }

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
