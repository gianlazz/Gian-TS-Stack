import { gCall } from "./gCall";

export const registerOrLogin = async (contextValue: any) => {
    const mutation = `
    mutation {
        register(data: {
        username: "glazzarini",
        email: "gianlazzarini@gmail.com",
        password: "Password0"
        })
    }
    `;
    const response = await gCall({ source: mutation, contextValue });
    if (response.data.register !== true) {
        const loginMutation = `
        mutation {
            login(password: "Password0", email: "gianlazzarini@gmail.com")
        }
        `;
        await gCall({ source: loginMutation, contextValue });
    }
};
