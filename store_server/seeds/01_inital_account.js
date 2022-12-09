/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */



exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('account').del()
  await knex('account').insert([
    { first_name: 'Rob', last_name: 'Banks', username: 'rob_banks', password:  '$2y$10$nCPNb4HjSCC2Ws9ZyAztrOjRlVu9F5W6u7FXpMZju/iBUPoyyhLki' },
    { first_name: 'Account', last_name: 'Admin', username: 'admin', password:  '$2y$10$AbSOqSotpCbaLXt6KleAQOjBIscSx74zuO5amCGk36pc/QrU36niK'},
    { first_name: 'Steve', last_name: 'Jobs', username: 'steve_jobs', password:  '$2y$10$WjheNJjOFGX9ZmKuhPdqUuptGx6ZbV1LVnlbYScTiIDUzJ6Cf62uq'},
    { first_name: 'Bill', last_name: 'Gates', username: 'bill_gates', password:  '$2y$10$p2D9LVuev4a99NLICq3xR.a32vj9oGxQZGEat3VxdeL0IP7Og4SrK'},
    { first_name: 'Elizabeth', last_name: 'Holmes', username: 'theranos', password:  '$2y$10$mWENrp3FShYIIBLXKvMoQ.AvNdi0EZRbPPagxOl09L8buhwlsgoDC'},
    { first_name: 'Bernie', last_name: 'Madoff', username: 'ftx', password: '$2y$10$a6ZBI/R6TeoUodjp9u.GBudcgCJ3i4EvnvqbvkEvms3yke7NXvbC.'  },
    { first_name: 'Lisa', last_name: 'su', username: 'amd', password:  '$2y$10$jbQg91pWBd5wzIo7rnYy9ewFVzqwBBLyDf8H2NifKBezBvYntS5rm'},
    { first_name: 'Alan', last_name: 'Turing', username: 'christopher', password:  '$2y$10$Rf5EQ7vhvGR//lhPVNEVledeTOtAHFcRpz1bePlOzP0HtRs5ZokoG'},
    { first_name: 'Larry', last_name: 'Page', username: 'google', password:  '$2y$10$nK/S0gmdnI8p9GPUiq2u6OXXwOv/aAdzx.gAULPMJhHimlBpsAWhW'},
    { first_name: 'Linus', last_name: 'Torvalds', username: 'linux', password:  '$2y$10$E31gN8VzhwbP5.stpH/OuuyUYqeVw.3p1AHc1bMHTAHe2DWDWpoUO'},
    
  ]);
};
