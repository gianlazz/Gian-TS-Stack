import { isNull, isNullOrUndefined } from "util";

export function envVariablesConfigured() {
    if (isNullOrUndefined(process.env.PORT)) {
        console.error("Missing process.env.PORT");
        return false;
    } else if (isNullOrUndefined(process.env.ACCESS_TOKEN_SECRET)) {
        console.error("Missing process.env.ACCESS_TOKEN_SECRET");
        return false;
    } else if (isNullOrUndefined(process.env.EMAIL_FROM_ADDRESS)) {
        console.error("Missing process.env.EMAIL_FROM_ADDRESS");
        return false;
    } else if (isNullOrUndefined(process.env.EMAIL_PASSWORD)) {
        console.error("Missing process.env.EMAIL_PASSWORD");
        return false;
    } else {
        return true;
    }
}
