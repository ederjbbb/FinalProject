'use strict';

const createMeals = (restaurantId) => {
  const result = [];
  for (let i = 1; i < 8; i++)
    result.push({
      restaurantId,
      name: 'Wow Hamburger' + i,
      description: 'Two thin 100 percent Irish beef patties grilled fresh to order and served in a bespoke burger bun. Choose from a wide range of toppings and sauces to build your very own burger.',
      price: i + 0.50,
      image: 'https://f.roocdn.com/images/menu_items/27288434/item-image.jpg?width=497&height=288&auto=webp&format=jpg&fit=crop&v=1566478469'
    });
  return result;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Meals', [
      ...createMeals(1),
      ...createMeals(2),
      ...createMeals(3),
      ...createMeals(4),
      ...createMeals(5),
      ...createMeals(6),
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Meals', null, {});
  }
};
