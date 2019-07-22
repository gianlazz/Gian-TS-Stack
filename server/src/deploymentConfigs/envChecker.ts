import { isNull, isNullOrUndefined } from "util";

export function envVariablesConfigured() {

    if (isNullOrUndefined(process.env.PORT)) {
        console.error("Missing process.env.PORT");
        return false;
    }

    if (isNullOrUndefined(process.env.ACCESS_TOKEN_SECRET)) {
        console.error("Missing process.env.ACCESS_TOKEN_SECRET");
        return false;
    }

    if (isNullOrUndefined(process.env.EMAIL_FROM_ADDRESS)) {
        console.error("Missing process.env.EMAIL_FROM_ADDRESS");
        return false;
    }

    if (isNullOrUndefined(process.env.EMAIL_PASSWORD)) {
        console.error("Missing process.env.EMAIL_PASSWORD");
        return false;
    }

    if (isNullOrUndefined(process.env.FIREBASE_SERVER_KEY)) {
        console.error("Missing process.env.FIREBASE_SERVER_KEY");
        return false;
    }

    return true;
}
