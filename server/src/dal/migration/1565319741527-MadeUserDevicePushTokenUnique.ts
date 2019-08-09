import {MigrationInterface, QueryRunner} from "typeorm";

export class MadeUserDevicePushTokenUnique1565319741527 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_device" DROP COLUMN "fcmPushUserToken"`);
        await queryRunner.query(`ALTER TABLE "user_device" ADD "fcmPushUserToken" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_device" ADD CONSTRAINT "UQ_9fa10355d40f3311b221b15c04c" UNIQUE ("fcmPushUserToken")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_device" DROP CONSTRAINT "UQ_9fa10355d40f3311b221b15c04c"`);
        await queryRunner.query(`ALTER TABLE "user_device" DROP COLUMN "fcmPushUserToken"`);
        await queryRunner.query(`ALTER TABLE "user_device" ADD "fcmPushUserToken" character varying NOT NULL`);
    }

}
