import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Users', async function (table) {
    table.uuid('uuid').primary().defaultTo(knex.raw('uuid_generate_v1()'));
    table.string('telegramId', 20).notNullable().unique();
    table.string('nickName').nullable().defaultTo(null);
    table.string('firstName').nullable().defaultTo(null);
    table.string('lastName').nullable().defaultTo(null);

    table.uuid('languageUuid');
    table.foreign('languageUuid').references('uuid').inTable('Languages');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Users');
}
