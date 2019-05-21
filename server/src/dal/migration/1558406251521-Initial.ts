import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1558406251521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "invite" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_fc9fa190e5a3c5d80604a4f63e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" text NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_location" ("userId" integer NOT NULL, "locationId" integer NOT NULL, CONSTRAINT "PK_4508045ac0bc9d45012293b9257" PRIMARY KEY ("userId", "locationId"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "name" character varying, "description" character varying, "latitude" character varying, "longitude" character varying, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_location" ADD CONSTRAINT "FK_2ba84b10be101377e01f153ecc8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_location" ADD CONSTRAINT "FK_a91360fae2a8d3003cb2a1188d5" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_location" DROP CONSTRAINT "FK_a91360fae2a8d3003cb2a1188d5"`);
        await queryRunner.query(`ALTER TABLE "user_location" DROP CONSTRAINT "FK_2ba84b10be101377e01f153ecc8"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "user_location"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "invite"`);
    }

}
