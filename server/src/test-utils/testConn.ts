import { createConnection } from "typeorm";

export const testConn = async (drop: boolean = false) => {
    return await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "test",
        password: "Password123",
        database: "postgres-test",
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
