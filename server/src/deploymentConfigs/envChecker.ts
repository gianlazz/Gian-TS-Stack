export function envVariablesConfigured() {
    if (!process.env.PORT) {
        console.error("Missing process.env.PORT");
        return false;
    } else if (!process.env.ACCESS_TOKEN_SECRET) {
        console.error("Missing process.env.ACCESS_TOKEN_SECRET");
        return false;
    } else if (!process.env.EMAIL_FROM_ADDRESS) {
        console.error("Missing process.env.EMAIL_FROM_ADDRESS");
        return false;
    } else if (!process.env.EMAIL_PASSWORD) {
        console.error("Missing process.env.EMAIL_PASSWORD");
        return false;
    } else {
        return true;
    }
}
