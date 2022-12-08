/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

 const bcrypt = require("bcrypt");
 const seedPassword = 'password'



const passwordGenerator = async() => {
  return (bcrypt.hash(seedPassword, 10));

}


exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('account').del()
  await knex('account').insert([
    { first_name: 'Rob', last_name: 'Banks', username: 'rob_banks', password: await passwordGenerator() },
    { first_name: 'Account', last_name: 'Admin', username: 'admin', password: await passwordGenerator()},
    { first_name: 'Steve', last_name: 'Jobs', username: 'steve_jobs', password: await passwordGenerator()},
    { first_name: 'Bill', last_name: 'Gates', username: 'bill_gates', password: await passwordGenerator()},
    { first_name: 'Elizabeth', last_name: 'Holmes', username: 'theranos', password: await passwordGenerator()},
    { first_name: 'Bernie', last_name: 'Madoff', username: 'ftx', password: await passwordGenerator()},
    { first_name: 'Lisa', last_name: 'su', username: 'amd', password: await passwordGenerator()},
    { first_name: 'Alan', last_name: 'Turing', username: 'christopher', password: await passwordGenerator()},
    { first_name: 'Larry', last_name: 'Page', username: 'google', password: await passwordGenerator()},
    { first_name: 'Linus', last_name: 'Torvalds', username: 'linux', password: await passwordGenerator()},
    
  ]);
};
