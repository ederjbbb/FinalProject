'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      phone: '+3530845434',
      email: 'customer@gmail.com',
      password: '$2a$10$Rua0lUL1ACWR5R4kLwboDOB6B0tu.5FwCSH2j4Gsh9BPd25I90XMS', //qwe123
      role: 'customer',
      id: 1
    },{
      firstName: 'Mary',
      lastName: 'Cook',
      phone: '+3530445432',
      email: 'merchant@gmail.com',
      password: '$2a$10$Rua0lUL1ACWR5R4kLwboDOB6B0tu.5FwCSH2j4Gsh9BPd25I90XMS',
      role: 'merchant',
      id: 2
    },{
      firstName: 'Messi',
      lastName: 'Silva',
      phone: '+3530865431',
      email: 'customer2@gmail.com',
      password: '$2a$10$Rua0lUL1ACWR5R4kLwboDOB6B0tu.5FwCSH2j4Gsh9BPd25I90XMS',
      role: 'customer',
      id: 3
    },{
      firstName: 'Jose',
      lastName: 'Soares',
      phone: '+3530746434',
      email: 'merchant2@gmail.com',
      password: '$2a$10$Rua0lUL1ACWR5R4kLwboDOB6B0tu.5FwCSH2j4Gsh9BPd25I90XMS',
      role: 'merchant',
      id: 4
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
