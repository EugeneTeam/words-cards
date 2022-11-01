import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', async function (table) {
    table.uuid('uuid').primary().defaultTo(knex.raw('uuid_generate_v1()'));
    table.string('telegram_id', 20).notNullable().unique();
    table.string('nickname').nullable().defaultTo(null);
    table.string('first_name').nullable().defaultTo(null);
    table.string('last_name').nullable().defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
