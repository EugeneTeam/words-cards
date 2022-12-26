import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('WordFiles', async function (table) {
    table.uuid('wordUuid');
    table.foreign('wordUuid').references('uuid').inTable('Files');

    table.uuid('fileUuid');
    table.foreign('fileUuid').references('uuid').inTable('Files');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('WordFiles');
}
