module.exports = {
  up:  (queryInterface, Sequelize) => 
     queryInterface.createTable('ipamnetwork', {
      network: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      vlan: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subnet: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      netmask: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      gateway: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      fromip: {
        type: Sequelize.STRING
      },
      toip: {
        type: Sequelize.STRING
      }
    }
    .then(function () {
      Sequelize.query("insert into ipamnetwork (network, vlan, subnet, netmask, gateway, fromip, toip) values ('test1',1001,'10.0.0.1/24','255.255.255.0','10.0.0.1','10.0.0.2','10.0.0.254')");
      Sequelize.query("insert into ipamnetwork (network, vlan, subnet, netmask, gateway, fromip, toip) values ('test2',1001,'20.0.0.1/24','255.255.255.0','20.0.0.1','20.0.0.2','20.0.0.254')");
      done();
  })),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('ipamnetwork'),
  };
