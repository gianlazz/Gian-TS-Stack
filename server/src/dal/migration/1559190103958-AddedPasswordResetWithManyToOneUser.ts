import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedPasswordResetWithManyToOneUser1559190103958 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "password_reset" ("userId" integer NOT NULL, "pin" integer NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_d29fde2fd822326e145ba121ea0" PRIMARY KEY ("userId", "pin"))`);
        await queryRunner.query(`ALTER TABLE "password_reset" ADD CONSTRAINT "FK_05baebe80e9f8fab8207eda250c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "password_reset" DROP CONSTRAINT "FK_05baebe80e9f8fab8207eda250c"`);
        await queryRunner.query(`DROP TABLE "password_reset"`);
    }

}
