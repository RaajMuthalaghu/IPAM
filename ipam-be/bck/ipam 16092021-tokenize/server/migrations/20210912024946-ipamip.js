'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('ipamip', [{
      network: 'test2',
      ip: '20.0.0.2'
    },
    {
      network: 'test2',
      ip: '20.0.0.3'
    },
    {
      network: 'test2',
      ip: '20.0.0.4'
  },
  {
    network: 'test2',
    ip: '20.0.0.5',
    exclude: true
  },
  {
    network: 'test2',
    ip: '20.0.0.6',
    hostname: 'SIX'
  }]);
},

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
