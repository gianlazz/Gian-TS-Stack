import {MigrationInterface, QueryRunner} from "typeorm";

export class UserGroup1561436206480 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user_group" ("userId" integer NOT NULL, "locationId" integer NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "PK_c05eb71901fb9448939b06ff849" PRIMARY KEY ("userId", "locationId", "groupId"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "name" character varying, "description" character varying, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD CONSTRAINT "FK_3d6b372788ab01be58853003c93" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD CONSTRAINT "FK_31e541c93fdc0bb63cfde6549b7" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_group" DROP CONSTRAINT "FK_31e541c93fdc0bb63cfde6549b7"`);
        await queryRunner.query(`ALTER TABLE "user_group" DROP CONSTRAINT "FK_3d6b372788ab01be58853003c93"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "user_group"`);
    }

}
