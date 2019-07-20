import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedUserToManyUserDevice1563662958639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user_device" ("id" SERIAL NOT NULL, "fcmPushUserToken" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_08962d15b3856b3d9eb009d46eb" PRIMARY KEY ("id", "userId"))`);
        await queryRunner.query(`ALTER TABLE "user_device" ADD CONSTRAINT "FK_bda1afb30d9e3e8fb30b1e90af7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_device" DROP CONSTRAINT "FK_bda1afb30d9e3e8fb30b1e90af7"`);
        await queryRunner.query(`DROP TABLE "user_device"`);
    }

}
