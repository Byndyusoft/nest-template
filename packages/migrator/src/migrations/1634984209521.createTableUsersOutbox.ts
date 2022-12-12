import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsersOutbox1634984209521 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_outbox"
       (
         "id"        BIGSERIAL                NOT NULL,
         "entity"    JSONB                    NOT NULL,
         "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL,

         CONSTRAINT "PK_14aae78f5a8fb285907e722d2e2" PRIMARY KEY ("id")
       )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users_outbox"`);
  }
}
