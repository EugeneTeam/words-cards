import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Translations', async function (table) {
    table.uuid('uuid').primary().defaultTo(knex.raw('uuid_generate_v1()'));
    table.string('translate').notNullable();

    table.uuid('wordUuid').notNullable();
    table.foreign('wordUuid').references('uuid').inTable('Words');

    table.uuid('originalLanguageUuid').notNullable();
    table
      .foreign('originalLanguageUuid')
      .references('uuid')
      .inTable('Languages');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Translations');
}
