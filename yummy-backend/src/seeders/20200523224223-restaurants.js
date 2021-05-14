'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Restaurants', [ {
        name: 'Supermac\'s',
        description: 'Supermac\'s has developed a unique innovative menu that caters for customers throughout the day. We offer traditional meals serving prime Irish beef burgers and succulent Irish chicken, and a range of drinks.',
        image: 'https://f.roocdn.com/images/menus/36733/header-image.jpg?width=730&height=366&auto=webp&format=jpg&fit=crop&v=1496399979',
        delivery: 3.49,
        tags: 'Wings, American',
        userId: 2
      },{
        name: 'Umi Falafael',
        description: 'Umi is named after the Arabic word for \'mother\', which explains why their falafels are handmade with such passion. Using a special mix of 14 ingredients, they prepare their falafels freshly every morning.',
        image: 'https://f.roocdn.com/images/menus/3940/header-image.jpg?width=730&height=366&auto=webp&format=jpg&fit=crop&v=1521637662',
        delivery: 2.50,
        tags: 'Arabic, Others',
        userId: 2
      },{
        name: 'Gourmet Burguer',
        description: 'The clue\'s in the name – since their first patty hit the grill in 2001, the crew behind Gourmet Burger Kitchen have been making jam-packed burgers and milkshakes that are that are guaranteed to satisfy those cravings.',
        image: 'https://f.roocdn.com/images/menus/66536/header-image.jpg?width=730&height=366&auto=webp&format=jpg&fit=crop&v=1531998826',
        delivery: 3.49,
        tags: 'Burger, American',
        userId: 2
      },{
        name: 'Musashi',
        description: 'Our sushi is made fresh by order and never leftover from the previous Hour. Not all sushi shops are as dedicated to freshness as we are at Musashi Sushi. The only thing better than fresh, mouthwatering, delicious sushi, is paying less for it!',
        image: 'https://f.roocdn.com/images/menus/66536/header-image.jpg?width=730&height=366&auto=webp&format=jpg&fit=crop&v=1531998826',
        delivery: 2.00,
        tags: 'Sushi, Chinese',
        userId: 2
      },{
        name: 'Manifesto',
        description: 'Chef-owner Lucio hails from the south of Italy, and using high quality ingredients, his passion for food is reflected in Manifesto’s menu. This multi-award winning restaurant’s pizzas will not disappoint.',
        image: 'https://f.roocdn.com/images/menus/84349/header-image.jpg?width=730&height=366&auto=webp&format=jpg&fit=crop&v=1538062642',
        delivery: 1.99,
        tags: 'Italy, Cousine',
        userId: 2
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Restaurants', null, {});
  }
};
