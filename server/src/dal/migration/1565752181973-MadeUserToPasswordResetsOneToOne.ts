import {MigrationInterface, QueryRunner} from "typeorm";

export class MadeUserToPasswordResetsOneToOne1565752181973 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "password_reset" DROP CONSTRAINT "FK_05baebe80e9f8fab8207eda250c"`);
        await queryRunner.query(`ALTER TABLE "password_reset" RENAME COLUMN "userId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "password_reset" RENAME CONSTRAINT "PK_d29fde2fd822326e145ba121ea0" TO "PK_3ca55e267798a3756a4595d7ddc"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "passwordResetId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_5d250ff0a3f3eba15ff2db819dd" UNIQUE ("passwordResetId")`);
        await queryRunner.query(`CREATE SEQUENCE "password_reset_id_seq" OWNED BY "password_reset"."id"`);
        await queryRunner.query(`ALTER TABLE "password_reset" ALTER COLUMN "id" SET DEFAULT nextval('password_reset_id_seq')`);
        await queryRunner.query(`ALTER TABLE "password_reset" DROP CONSTRAINT "PK_3ca55e267798a3756a4595d7ddc"`);
        await queryRunner.query(`ALTER TABLE "password_reset" ADD CONSTRAINT "PK_8515e60a2cc41584fa4784f52ce" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_5d250ff0a3f3eba15ff2db819dd" FOREIGN KEY ("passwordResetId") REFERENCES "password_reset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_5d250ff0a3f3eba15ff2db819dd"`);
        await queryRunner.query(`ALTER TABLE "password_reset" DROP CONSTRAINT "PK_8515e60a2cc41584fa4784f52ce"`);
        await queryRunner.query(`ALTER TABLE "password_reset" ADD CONSTRAINT "PK_3ca55e267798a3756a4595d7ddc" PRIMARY KEY ("id", "pin")`);
        await queryRunner.query(`ALTER TABLE "password_reset" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "password_reset_id_seq"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_5d250ff0a3f3eba15ff2db819dd"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordResetId"`);
        await queryRunner.query(`ALTER TABLE "password_reset" RENAME CONSTRAINT "PK_3ca55e267798a3756a4595d7ddc" TO "PK_d29fde2fd822326e145ba121ea0"`);
        await queryRunner.query(`ALTER TABLE "password_reset" RENAME COLUMN "id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "password_reset" ADD CONSTRAINT "FK_05baebe80e9f8fab8207eda250c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
