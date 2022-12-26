import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Words', async function (table) {
    table.uuid('uuid').primary().defaultTo(knex.raw('uuid_generate_v1()'));
    table.string('word').notNullable();
    table.string('note').nullable().defaultTo(null);

    table.uuid('originalLanguageUuid');
    table
      .foreign('originalLanguageUuid')
      .references('uuid')
      .inTable('Languages');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Words');
}
