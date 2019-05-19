export function envVariablesConfigured() {
    if (
        process.env.PORT
//        && process.env.HOST_URL
        && process.env.ACCESS_TOKEN_SECRET
    ) {
        return true;
    } else {
        return false;
    }
}