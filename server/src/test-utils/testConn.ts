import { createConnection } from "typeorm";

export const testConn = async (drop: boolean = false) => {
    return await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: (process.env.NODE_ENV === "docker") ? "docker" : "test",
        password: (process.env.NODE_ENV === "docker") ? "docker" : "Password123",
        database: (process.env.NODE_ENV === "docker") ? "docker" : "postgres-test",
        // synchronize: drop,
        migrationsRun: true,
        logging: true,
        dropSchema: drop,
        entities: [
            __dirname + "/../dal/entity/**/*.ts"
        ],
        migrations: [
            __dirname + "/../dal/migration/**/*.ts"
        ]
    });
};
