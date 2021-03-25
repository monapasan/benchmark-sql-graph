import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1616367125099 implements MigrationInterface {
    name = 'myInit1616367125099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Statement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "contextIdId" uuid, CONSTRAINT "PK_3dd87ecaf0b1ea7f30b0e8e34a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Context" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "contextName" character varying(100) NOT NULL, "CreationDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "userIdId" uuid, CONSTRAINT "PK_3bed32bef9825045176f42ce722" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Statement" ADD CONSTRAINT "FK_7fce2265c4f7c03fa89e850b5c2" FOREIGN KEY ("contextIdId") REFERENCES "Context"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Context" ADD CONSTRAINT "FK_90be2722ec376eddade495798b7" FOREIGN KEY ("userIdId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Context" DROP CONSTRAINT "FK_90be2722ec376eddade495798b7"`);
        await queryRunner.query(`ALTER TABLE "Statement" DROP CONSTRAINT "FK_7fce2265c4f7c03fa89e850b5c2"`);
        await queryRunner.query(`DROP TABLE "Context"`);
        await queryRunner.query(`DROP TABLE "Statement"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
