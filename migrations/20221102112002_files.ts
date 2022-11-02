import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('files', async function (table) {
    table.uuid('uuid').primary().defaultTo(knex.raw('uuid_generate_v1()'));
    table.string('name').notNullable().unique();
    table.string('fileToken').notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('files');
}
