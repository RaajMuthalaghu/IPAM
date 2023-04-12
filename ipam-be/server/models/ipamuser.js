module.exports = (sequelize, DataTypes) => {
  const ipamuser = sequelize.define('ipamuser', {
    username: {type: DataTypes.STRING, allowNull: false, primaryKey: true,},
    password: {type: DataTypes.STRING, allowNull: false,},
    admintype: {type: DataTypes.BOOLEAN, allowNull: false,}
  },
  {
    freezeTableName: true,
    timestamps: false
  });
  ipamuser.removeAttribute('id');

  ipamuser.associate = (models) => {}
  return ipamuser;
  };

  