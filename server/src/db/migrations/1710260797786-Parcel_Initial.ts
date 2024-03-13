import { MigrationInterface, QueryRunner } from 'typeorm';

export class ParcelInitial1710260797786 implements MigrationInterface {
  name = 'ParcelInitial1710260797786';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pg_trgm"');
    await queryRunner.query(
      `CREATE TABLE "parcel" ("id" SERIAL NOT NULL, "trace_id" character varying NOT NULL, "sku" character varying NOT NULL, "description" text NOT NULL, "street_address" character varying NOT NULL, "town" character varying NOT NULL, "country" character varying NOT NULL, "delivery_date" date NOT NULL, CONSTRAINT "UQ_bccf1a14143b3773873caee15de" UNIQUE ("trace_id"), CONSTRAINT "UQ_f9017bd9005aa8e7d9dab713065" UNIQUE ("sku"), CONSTRAINT "PK_c01e9fed31b7433a00942d506b1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9176cc9540d4247f6cbce9ab24" ON "parcel" (LOWER("description")) `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a80aef8ed6fc118f97d5f2d4ed" ON "parcel" (LOWER("country")) `,
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_DESC_GIN" ON "parcel" USING gin (description gin_trgm_ops)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_DESC_GIN"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a80aef8ed6fc118f97d5f2d4ed"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9176cc9540d4247f6cbce9ab24"`,
    );
    await queryRunner.query(`DROP TABLE "parcel"`);
    await queryRunner.query(`DROP EXTENSION "pg_trgm"`);
  }
}
