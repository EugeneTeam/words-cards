import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Files', async function (table) {
    table.uuid('uuid').primary().defaultTo(knex.raw('uuid_generate_v1()'));
    table
      .enum('type', ['video', 'audio', 'image', 'document', 'voice', 'unknown'])
      .notNullable();
    table.string('token').notNullable().unique();
    table.uuid('userUuid');
    table.foreign('userUuid').references('uuid').inTable('Users');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Files');
}
