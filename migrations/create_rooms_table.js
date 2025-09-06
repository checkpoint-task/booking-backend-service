export function up(knex) {
  return knex.schema.createTable('rooms', (table) => {
    table.string('room_id').primary();
    table.string('name', 100).notNullable();
    table.string('location', 100).notNullable();
    table.float('price_per_night').notNullable();
    table.integer('capacity').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists('rooms');
}
