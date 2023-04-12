module.exports = (sequelize, DataTypes) => {
  const ipamnetwork = sequelize.define('ipamnetwork', {
    network: {type: DataTypes.STRING, allowNull: false, primaryKey: true},
    vlan: {type: DataTypes.INTEGER, allowNull: false,},
    subnet: {type: DataTypes.STRING, allowNull: false,},
    netmask: {type: DataTypes.STRING, allowNull: false,},
    gateway: {type: DataTypes.STRING, allowNull: false,},
    fromip: {type: DataTypes.STRING, allowNull: false,},
    toip: {type: DataTypes.STRING, allowNull: false,}
  },
  {
    freezeTableName: true,
    timestamps: false
  });
  ipamnetwork.removeAttribute('id');

  return ipamnetwork;
  };




//'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ipamnetwork extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   ipamnetwork.init({
//     network: DataTypes.STRING,
//     vlan: DataTypes.INTEGER,
//     subnet: DataTypes.STRING,
//     netmask: DataTypes.STRING,
//     gateway: DataTypes.STRING,
//     fromip: DataTypes.STRING,
//     toip: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'ipamnetwork',
//   });
//   return ipamnetwork;
// };