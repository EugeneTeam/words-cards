import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('WordStatistics', async function (table) {
    table.uuid('uuid').primary().defaultTo(knex.raw('uuid_generate_v1()'));
    table.datetime('unavailableUntil').nullable();
    table.integer('numberOfRepetitions').nullable().defaultTo(0);
    table.integer('rememberedCount').nullable().defaultTo(0);

    table.uuid('wordUuid').notNullable();
    table.foreign('wordUuid').references('uuid').inTable('Words');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('WordStatistics');
}
