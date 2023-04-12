module.exports = {
  up:  (queryInterface, Sequelize) => 
     queryInterface.createTable('ipamip', {
      network: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ip: {
        allowNull: false,
        type: Sequelize.STRING
      },
      exclude: {
        default: false,
        type: Sequelize.BOOLEAN
      },
      hostname: {
        type: Sequelize.STRING
      }
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('ipamip'),
  };