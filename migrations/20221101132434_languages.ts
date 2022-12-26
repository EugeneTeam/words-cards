import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Languages', async function (table) {
    table.uuid('uuid').primary().defaultTo(knex.raw('uuid_generate_v1()'));
    table.string('name', 100).notNullable().unique();
    table.string('iso', 3).notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Languages');
}
