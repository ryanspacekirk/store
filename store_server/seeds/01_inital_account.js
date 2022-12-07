/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('account').del()
  await knex('account').insert([
    {id: 1, first_name: 'Rob', last_name: 'Banks', username: 'rob_banks', password: 'usaa'},
    {id: 2, first_name: 'Account', last_name: 'Admin', username: 'admin', password: 'admin'},
    
  ]);
};
