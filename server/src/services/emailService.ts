// import nodemailer, { Transporter } from 'nodemailer';
import * as nodemailer from "nodemailer";
import { Service } from "typedi";
import { isNullOrUndefined } from "util";
import { PasswordReset } from "../dal/entity/passwordReset";
import { IEmailService } from "./emailService.interface";

@Service()
export class EmailService implements IEmailService {

    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_FROM_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    public async sendPasswordResetEmail(email: string, name: string): Promise<number> {

        let pin: number;
        let isNewPin = false;
        while (!isNewPin) {
            pin = this.generateRandomPin();
            const result = await PasswordReset.findOne({ pin });
            if (!result) {
                isNewPin = true;
            }
        }

        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.EMAIL_FROM_ADDRESS,
            to: email,
            subject: `Password reset for ${name}!`,
            text: `Hello, ${name}, please paste in the follow to reset your password: ${pin}`,
            html: `<b>Hello, <strong>${name}</strong>, Please paste in the follow to reset your password: ${pin}</p>`
        } as nodemailer.SendMailOptions;

        const messageId = await this.transporter.sendMail(mailOptions).then((info) => info.messageId);

        if (messageId) {
            return pin;
        } else {
            console.error("Email send failed.");
            return null;
        }
    }

    private generateRandomPin(): number {
        const val = Math.floor(1000 + Math.random() * 9000);
        return val;
    }
}
