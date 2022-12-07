/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('account', table => {
            table.increments('id');
            table.string('first_name', 40);
            table.string('last_name', 40);
            table.string('username', 40);
            table.string('password', 40);


        })

        .createTable('item', table => {
            table.increments('id');
            table.integer('user_id');
            table.foreign('user_id').references('account.id');
            table.string('item_name', 50);
            table.string('description', 1000);
            table.integer('quantity');

        })

  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .alterTable('item', table => {
        table.dropForeign('user_id');
    })
    .then( function () {
        return knex.schema.dropTableIfExists('item');
    })
    .then( function () {
        return knex.schema.dropTableIfExists('account');
    })
  
};
