export async function up(knex) {
  if (knex.client.config.client === 'sqlite3') {
    await knex.raw('PRAGMA foreign_keys = ON');
  }
  return knex.schema.createTable('bookings', (table) => {
    table.string('booking_id').primary();

    table.string('user_id').notNullable()
      .references('user_id').inTable('users')
      .onDelete('CASCADE');

    table.string('room_id').notNullable()
      .references('room_id').inTable('rooms')
      .onDelete('CASCADE');

    table.date('start_date').notNullable();
    table.date('end_date').notNullable();

    table.string('status', 20).defaultTo('confirmed');

    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.check('end_date > start_date');

    table.unique(['room_id', 'start_date', 'end_date']);
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists('bookings');
}
