import {MigrationInterface, QueryRunner} from "typeorm";

export class MadeColumnsInInAppNotificationsNullable1565419210919 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "in_app_notifications" ALTER COLUMN "thumbnail" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "in_app_notifications" ALTER COLUMN "actionLink" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "in_app_notifications" ALTER COLUMN "actionLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "in_app_notifications" ALTER COLUMN "thumbnail" SET NOT NULL`);
    }

}
