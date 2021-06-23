exports.up = function (knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(function () {
      return knex.schema
        .createTable('reservations', function (table) {
          table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
          table.uuid('customer_id');
          table.uuid('translator_id');
          table.string('start_time', 255).notNullable();
          table.integer('duration_minutes').notNullable();
          table.string('url', 255);
          table.boolean('accepted');
        })
        .createTable('customers', function (table) {
          table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
          table.string('name', 255).notNullable();
          table.string('google_id', 255).notNullable();
          table.string('email', 255).notNullable();
          table.string('phone', 255);
          table.specificType('reservation_ids', 'uuid ARRAY');
        })
        .createTable('translators', function (table) {
          table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
          table.string('name', 255).notNullable();
          table.string('google_id', 255).notNullable();
          table.string('email', 255).notNullable();
          table.string('phone', 255);
          table.integer('price').notNullable();
          table.specificType('languages', 'text ARRAY').notNullable();
          table.specificType('reservation_ids', 'uuid ARRAY');
        })
        .alterTable('reservations', function (table) {
          table.foreign('customer_id').references('id').inTable('customers');
          table.foreign('translator_id').references('id').inTable('translators');
        })
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('reservations')
    .dropTable('customers')
    .dropTable('translators')
};
