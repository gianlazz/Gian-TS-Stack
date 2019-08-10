import {MigrationInterface, QueryRunner} from "typeorm";

export class JoinUserInAppNotificationsAndJoinRename1565469027820 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "in_app_notification" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "date" character varying NOT NULL, "thumbnail" character varying, "actionLink" character varying, CONSTRAINT "PK_9c57597f8e042ab80df73847de4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "join_user_in_app_notifications" ("userId" integer NOT NULL, "inAppNotificationId" integer NOT NULL, CONSTRAINT "PK_88fdc209e87a69b0a9024d37dd6" PRIMARY KEY ("userId", "inAppNotificationId"))`);
        await queryRunner.query(`CREATE TABLE "join_user_group" ("userId" integer NOT NULL, "locationId" integer NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "PK_517f42e1ae6c80aaae10e60cd51" PRIMARY KEY ("userId", "locationId", "groupId"))`);
        await queryRunner.query(`ALTER TABLE "join_user_in_app_notifications" ADD CONSTRAINT "FK_d342396ba51c5ed48dfef10fe28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join_user_in_app_notifications" ADD CONSTRAINT "FK_5a574454bde0417279789491071" FOREIGN KEY ("inAppNotificationId") REFERENCES "in_app_notification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join_user_group" ADD CONSTRAINT "FK_d231827af7b3b889d62f6ebb3e5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join_user_group" ADD CONSTRAINT "FK_ebc9c865bc14710e2fd94b26b89" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "join_user_group" DROP CONSTRAINT "FK_ebc9c865bc14710e2fd94b26b89"`);
        await queryRunner.query(`ALTER TABLE "join_user_group" DROP CONSTRAINT "FK_d231827af7b3b889d62f6ebb3e5"`);
        await queryRunner.query(`ALTER TABLE "join_user_in_app_notifications" DROP CONSTRAINT "FK_5a574454bde0417279789491071"`);
        await queryRunner.query(`ALTER TABLE "join_user_in_app_notifications" DROP CONSTRAINT "FK_d342396ba51c5ed48dfef10fe28"`);
        await queryRunner.query(`DROP TABLE "join_user_group"`);
        await queryRunner.query(`DROP TABLE "join_user_in_app_notifications"`);
        await queryRunner.query(`DROP TABLE "in_app_notification"`);
    }

}
