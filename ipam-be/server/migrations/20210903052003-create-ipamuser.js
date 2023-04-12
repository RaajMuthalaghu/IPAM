module.exports = {
    up:  (queryInterface, Sequelize) => 
       queryInterface.createTable('ipamuser', {
      username: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      admintype: {
        default: false,
        type: Sequelize.BOOLEAN
      }
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('ipamuser'),
};