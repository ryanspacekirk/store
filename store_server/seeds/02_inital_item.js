/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {id: 1, user_id: 1, item_name: 'MacBook Pro', description: '16 inch Apple MacBook pro with M1 Pro chipset', quantity: 42 },
    {id: 2, user_id: 2, item_name: 'Garmin Fenix', description: 'Garmin Fenix 6s Multisport watch', quantity: 1 }
    
  ]);
};
