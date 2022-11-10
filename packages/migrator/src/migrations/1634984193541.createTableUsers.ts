import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsers1634984193541 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users"
       (
         "id"         BIGSERIAL NOT NULL,
         "name"       TEXT      NOT NULL,
         "email"      TEXT      NOT NULL,
         "version"    INTEGER   NOT NULL,
         "deleted_at" TIMESTAMP WITH TIME ZONE,

         CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
       )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
