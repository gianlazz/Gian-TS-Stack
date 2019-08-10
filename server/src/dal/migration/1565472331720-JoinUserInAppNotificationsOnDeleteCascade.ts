import {MigrationInterface, QueryRunner} from "typeorm";

export class JoinUserInAppNotificationsOnDeleteCascade1565472331720 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "join_user_in_app_notifications" DROP CONSTRAINT "FK_d342396ba51c5ed48dfef10fe28"`);
        await queryRunner.query(`ALTER TABLE "join_user_in_app_notifications" ADD CONSTRAINT "FK_d342396ba51c5ed48dfef10fe28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "join_user_in_app_notifications" DROP CONSTRAINT "FK_d342396ba51c5ed48dfef10fe28"`);
        await queryRunner.query(`ALTER TABLE "join_user_in_app_notifications" ADD CONSTRAINT "FK_d342396ba51c5ed48dfef10fe28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
