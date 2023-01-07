import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Categories', async function (table) {
    table.uuid('uuid').primary().defaultTo(knex.raw('uuid_generate_v1()'));
    table.string('name').notNullable();

    table.uuid('userUuid');
    table.foreign('userUuid').references('uuid').inTable('Users');

    table.primary(['userUuid', 'name']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Categories');
}
