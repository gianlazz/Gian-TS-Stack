import {MigrationInterface, QueryRunner} from "typeorm";

export class JoinUserGroupOnUserDeletedCascade1565472513680 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "join_user_in_app_notifications" DROP CONSTRAINT "FK_d342396ba51c5ed48dfef10fe28"`);
        await queryRunner.query(`ALTER TABLE "join_user_group" DROP CONSTRAINT "FK_d231827af7b3b889d62f6ebb3e5"`);
        await queryRunner.query(`ALTER TABLE "join_user_group" DROP CONSTRAINT "PK_517f42e1ae6c80aaae10e60cd51"`);
        await queryRunner.query(`ALTER TABLE "join_user_group" ADD CONSTRAINT "PK_02c648cd4e69f7f2326fd9276fd" PRIMARY KEY ("userId", "locationId")`);
        await queryRunner.query(`ALTER TABLE "join_user_group" DROP CONSTRAINT "FK_ebc9c865bc14710e2fd94b26b89"`);
        await queryRunner.query(`ALTER TABLE "join_user_group" ALTER COLUMN "groupId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "join_user_group" DROP CONSTRAINT "PK_517f42e1ae6c80aaae10e60cd51"`);
        await queryRunner.query(`ALTER TABLE "join_user_group" ADD CONSTRAINT "PK_02c648cd4e69f7f2326fd9276fd" PRIMARY KEY ("userId", "locationId")`);
        await queryRunner.query(`ALTER TABLE "join_user_in_app_notifications" ADD CONSTRAINT "FK_d342396ba51c5ed48dfef10fe28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join_user_group" ADD CONSTRAINT "FK_d231827af7b3b889d62f6ebb3e5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join_user_group" ADD CONSTRAINT "FK_ebc9c865bc14710e2fd94b26b89" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "join_user_group" DROP CONSTRAINT "FK_ebc9c865bc14710e2fd94b26b89"`);
        await queryRunner.query(`ALTER TABLE "join_user_group" DROP CONSTRAINT "FK_d231827af7b3b889d62f6ebb3e5"`);
        await queryRunner.query(`ALTER TABLE "join_user_in_app_notifications" DROP CONSTRAINT "FK_d342396ba51c5ed48dfef10fe28"`);
        await queryRunner.query(`ALTER TABLE "join_user_group" DROP CONSTRAINT "PK_02c648cd4e69f7f2326fd9276fd"`);
        await queryRunner.query(`ALTER TABLE "join_user_group" ADD CONSTRAINT "PK_517f42e1ae6c80aaae10e60cd51" PRIMARY KEY ("userId", "locationId", "groupId")`);
        await queryRunner.query(`ALTER TABLE "join_user_group" ALTER COLUMN "groupId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "join_user_group" ADD CONSTRAINT "FK_ebc9c865bc14710e2fd94b26b89" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join_user_group" DROP CONSTRAINT "PK_02c648cd4e69f7f2326fd9276fd"`);
        await queryRunner.query(`ALTER TABLE "join_user_group" ADD CONSTRAINT "PK_517f42e1ae6c80aaae10e60cd51" PRIMARY KEY ("userId", "locationId", "groupId")`);
        await queryRunner.query(`ALTER TABLE "join_user_group" ADD CONSTRAINT "FK_d231827af7b3b889d62f6ebb3e5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join_user_in_app_notifications" ADD CONSTRAINT "FK_d342396ba51c5ed48dfef10fe28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
