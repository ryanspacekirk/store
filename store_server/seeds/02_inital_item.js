/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    { 
      user_id: 1,
      item_name: 'The Bad Beginning',
      description: "The Bad Beginning is the first novel of the children's novel series A Series of Unfortunate Events by Lemony Snicket. The novel tells the story of three children, Violet, Klaus, and Sunny Baudelaire, who become orphans following a fire and are sent to live with Count Olaf, who attempts to steal their inheritance.", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 1,
      item_name: 'The Reptile Room',
      description: "The children are fascinated by the many snakes in the Reptile Room, a giant hall in which their Uncle Monty's reptile collection is stored. They meet the Incredibly Deadly Viper, which Uncle Monty recently discovered, whose name is actually a misnomer to its harmless and friendly nature.", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 1,
      item_name: 'The Reptile Room',
      description: "The Wide Window is the third novel of the children's book series A Series of Unfortunate Events by Lemony Snicket. In this novel, the Baudelaire orphans live with their aunt Josephine, who is seemingly scared of everything. The book was published on February 25, 2000 by HarperCollins and illustrated by Brett Helquist.", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 1,
      item_name: 'The Miserable Mill',
      description: "The fourth novel of the series is called The Miserable Mill (2000). It follows three orphans as they endure hard labor while their distant relative, Count Olaf, attempts to steal the inheritance left to them by their deceased parents.", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 1,
      item_name: 'The Austere Academy',
      description: "The Austere Academy is the fifth novel in the children's novel series A Series of Unfortunate Events by Lemony Snicket. The Baudelaire orphans are sent to a boarding school, overseen by monstrous employees. There, the orphans meet new friends, new enemies, and Count Olaf in disguises.", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 1,
      item_name: 'The Ersatz Elevator',
      description: "Mr. Poe takes the Baudelaire orphans to their new home on 667 Dark Avenue. The street is dark, as light is out, or unpopular. The elevators in the apartment building are not working, as elevators are out, leaving the Baudelaires to walk up several dozen flights of stairs to the penthouse where the Squalors live.", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 1,
      item_name: 'The Vile Village Elevator',
      description: "The Vile Village is the seventh novel in the children's book series A Series of Unfortunate Events by Lemony Snicket. In The Vile Village, the Baudelaire orphans are taken into the care of a whole village, only to find many rules and chores, evil seniors, as well as Count Olaf and his evil girlfriend lurking nearby", 
      quantity: Math.floor(Math.random() * 10) + 1 },
    
    { 
      user_id: 1,
      item_name: 'The Hostile Hospital',
      description: "In this book, the Baudelaires are on run after being accused for murdering Count Olaf (Jacques Snicket). They take refugee in a half-built hospital and secretly sleep in its unfinished half for shelter. Count Olaf and his troupe develop a scheme to perform a cranioectomy on Violet, meaning her head would be cut off against her will while under anesthesia, making it impossible for her to inherit the fortune. Klaus and Sunny work together to save their older sister from dying in the operation. ", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 1,
      item_name: 'The Carnivorous Carnival Hospital Elevator',
      description: "In this book, the homeless Baudelaires arrive at Caligari Carnival after fleeing from Heimlich Hospital. They attempt to masquerade as freaks in order to find shelter and avoid capture by Count Olaf, only to discover he is lurking at the carnival longer than they thought. ", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 1,
      item_name: 'The Slippery SLope',
      description: "In this book, the siblings go through freezing mountains. Violet and Klaus plan to rescue their baby sister, who had been captured by Count Olaf, while also searching for V.F.D. Headquarters, as well as one of their parents.  ", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 1,
      item_name: 'The Grim Grotto',
      description: "In this book, the Baudelaires stay in a submarine and become entangled in the plight of V.F.D., as they search for a sugar bowl. ", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 1,
      item_name: 'The Penultimate Peril',
      description: "Penultimate means next to last, which is literally what Book the Twelfth is. So, quite literally, the title means The next to last peril.In this book, the Baudelaires disguise themselves as hotel concierges while trying to uncover the mysteries surrounding V.F.D. ", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 1,
      item_name: 'The End',
      description: "The book was later adapted into the TV series produced by Netflix as the seventh and final episode of season 3, as well as the entire TV series. In this book, the Baudelaires and Count Olaf end up being trapped on a castaway island where its islanders attempt to create a peaceful utopia. ", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 2,
      item_name: "The Sorcerer's Stone",
      description: "Harry Potter is the most miserable, lonely boy you can imagine. He's shunned by his relatives, the Dursleys, who have raised him since he was an infant. He's forced to live in the cupboard under the stairs, forced to wear his cousin Dudley's hand-me-down clothes, and forced to go to his neighbour's house when the rest of the family is doing something fun. Yes, he's just about as miserable as you can get. ", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 3,
      item_name: "The Chamber of Secrets",
      description: "On Harry Potter's twelfth birthday, the Dursleys—Vernon, Petunia, and Dudley—hold a dinner party. Uninvited, Harry is visited by the house-elf Dobby, who warns him not to return to Hogwarts. Harry refuses, so Dobby uses magic to ruin the dinner, nearly getting Harry expelled from Hogwarts. Vernon locks Harry in his room in retaliation.", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 4,
      item_name: "The Priosner of Azkaban",
      description: " Harry Potter and the Prisoner of Azkaban follows Harry's adventures in his third year at Hogwarts School of Witchcraft and Wizardry. This year Harry is up against murderer Sirius Black, and also learns more about his father's past. ", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 5,
      item_name: "The Goblet of Fire",
      description: " Throughout the three previous novels in the Harry Potter series, the main character, Harry Potter, has struggled with the difficulties of growing up and the added challenge of being a famed wizard. When Harry was a baby, Lord Voldemort, the most powerful dark wizard in history, killed Harry's parents but was mysteriously defeated after unsuccessfully trying to kill Harry, though his attempt left a lightning-shaped scar on Harry's forehead.", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 6,
      item_name: "The Order of the Phoenix",
      description: " It follows Harry Potter's struggles through his fifth year at Hogwarts School of Witchcraft and Wizardry, including the surreptitious return of the antagonist Lord Voldemort, O.W.L. exams, and an obstructive Ministry of Magic.", 
      quantity: Math.floor(Math.random() * 10) + 1 },
    
    { 
      user_id: 7,
      item_name: "The Half Blood Prince",
      description: " As Death Eaters wreak havoc in both Muggle and Wizard worlds, Hogwarts is no longer a safe haven for students. Though Harry (Daniel Radcliffe) suspects there are new dangers lurking within the castle walls, Dumbledore is more intent than ever on preparing the young wizard for the final battle with Voldemort. Meanwhile, teenage hormones run rampant through Hogwarts, presenting a different sort of danger. Love may be in the air, but tragedy looms, and Hogwarts may never be the same again.", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 8,
      item_name: "The Deathly Hallows",
      description: " While villainous Lord Voldemort begins taking over the Ministry of Magic, Harry, Ron and Hermione must race against time to finish Dumbledore's quest to find and destroy Voldemort's Horcruxes in order to stop the Dark Lord once and for all.", 
      quantity: Math.floor(Math.random() * 10) + 1 },
    
    { 
      user_id: 9,
      item_name: "The Hunger Games",
      description: " The Hunger Games is a novel about Katniss Everdeen, who's forced to fight other children in an arena. The book takes place in Panem, which was once North America and has limited resources. In order to keep the citizens under control, the government separates them into districts and reinforces class differences.", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
      user_id: 10,
      item_name: "Catching Fire",
      description: " After arriving safely home from their unprecedented victory in the 74th Annual Hunger Games, Katniss Everdeen (Jennifer Lawrence) and Peeta Mellark (Josh Hutcherson) discover that they must do a quick turnaround and begin a Victors Tour. As she and Peeta travel throughout the districts, Katniss senses a rebellion is stirring. However, President Snow (Donald Sutherland) proves that he is still very much in control when word comes of a cruel change in the rules for the upcoming 75th Hunger Games.", 
      quantity: Math.floor(Math.random() * 10) + 1 },

    { 
        user_id: 2,
        item_name: "Mockingjay",
        description: " Katniss Everdeen has been rescued from the Quarter Quell arena, only to discover that she has become the pawn in someone else’s game. Her home, District 12, has been obliterated by the Capitol, and she now lives in District 13. Supposedly destroyed by the Capitol, District 13 is the organizing force of the rebellion. Twelve districts in Panem have taken up arms against the cruelty of President Snow and the exploitation by the Capitol. Katniss must now serve as the face of the rebellion, their Mockingjay, or forfeit the lives of her loved ones: her mother, her sister Prim, her friend Gale Hawthorne, and her fellow Hunger Games victor Peeta Mellark. She leverages her power over the rebellion’s leader, Alma Coin, to her advantage. She soon discovers that her efforts will cost her dearly.", 
        quantity: Math.floor(Math.random() * 10) + 1 },   
    
  ]);
};
