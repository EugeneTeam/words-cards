import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Configurations', async function (table) {
    table.uuid('uuid').primary().defaultTo(knex.raw('uuid_generate_v1()'));

    table.uuid('userUuid').notNullable();
    table.foreign('userUuid').references('uuid').inTable('Users');

    table.uuid('defaultLanguageForNewWord').notNullable();
    table
      .foreign('defaultLanguageForNewWord')
      .references('uuid')
      .inTable('Languages');

    table.uuid('defaultLanguageForWordTranslation').notNullable();
    table
      .foreign('defaultLanguageForWordTranslation')
      .references('uuid')
      .inTable('Languages');

    table.boolean('useDefaultLanguage').nullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Configurations');
}
