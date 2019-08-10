import {MigrationInterface, QueryRunner} from "typeorm";

export class UserToManyInAppNotifications1565400486535 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "in_app_notifications" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "text" character varying NOT NULL, "date" character varying NOT NULL, "thumbnail" character varying NOT NULL, "actionLink" character varying NOT NULL, CONSTRAINT "PK_f871e2a23724692bbb5b3b75c98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "in_app_notifications" ADD CONSTRAINT "FK_e18528b5d7c65d78772bb2d5092" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "in_app_notifications" DROP CONSTRAINT "FK_e18528b5d7c65d78772bb2d5092"`);
        await queryRunner.query(`DROP TABLE "in_app_notifications"`);
    }

}
