module.exports = (sequelize, DataTypes) => {
  const ipamip = sequelize.define('ipamip', {
    network: {type: DataTypes.STRING, allowNull: false,},
    ip: {type: DataTypes.STRING, allowNull: false,},
    exclude: {type: DataTypes.BOOLEAN, defaultValue: false},
    hostname: {type: DataTypes.STRING}
  },
  {
    freezeTableName: true,
    timestamps: false
  });
  ipamip.removeAttribute('id');

  return ipamip;
};

