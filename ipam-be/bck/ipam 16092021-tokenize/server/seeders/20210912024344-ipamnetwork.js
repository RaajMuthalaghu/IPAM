module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ipamnetwork', [{
      network: 'test1',
      vlan: '1001',
      subnet: '10.0.0.1/24',
      netmask: '255.255.255.0',
      gateway: '10.0.0.1',
      fromip: '10.0.0.2',
      toip: '10.0.0.254'
  },
  {
    network: 'test2',
    vlan: '1002',
    subnet: '20.0.0.1/24',
    netmask: '255.255.255.0',
    gateway: '20.0.0.1',
    fromip: '20.0.0.2',
    toip: '20.0.0.254'
  }]);
},
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('ipamnetwork', null, {});
  }
};
