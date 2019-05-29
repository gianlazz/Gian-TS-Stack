export class EmailService {

    constructor() {}

    async sendPasswordResetEmail(email: string): Promise<number> {
        let pin = this.generateRandomPin();

        while (PasswordReset.findOne({ pin }) !== null ) {
            pin = this.generateRandomPin();
        }

        const body = "";
        const toAddress = "";

        const result = sendEmail(toAddress, body);

        if (result) {
            return pin;
        } else {
            return null;
        }
    }

    private generateRandomPin(): number {
        const val = Math.floor(1000 + Math.random() * 9000);
        return val;
    }
}