const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: process.env.PGHOST || config.host,
//  port: process.env.PGPORT || 5432,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ipamuser = require("./ipamuser.js")(sequelize, Sequelize);
db.ipamnetwork = require("./ipamnetwork.js")(sequelize, Sequelize);
db.ipamip = require("./ipamip.js")(sequelize, Sequelize);
db.ipamip.belongsTo(db.ipamnetwork, {
  foreignKey: 'network',
  onDelete: 'CASCADE',
});
db.ipamnetwork.hasMany(db.ipamip, {
  foreignKey: 'network',
});

db.ROLES = ["user", "admin"];

function seed() {
  db.ipamuser.create({ username: "Raaj", password: "$2a$08$c5DyKaVHg7GxaFdRe1F4me0dYKOMJ5eXloyT2ZWG5w7Qw82517c8O",  admintype: true });
  db.ipamuser.create({ username: "admin", password: "$2a$08$DtZBv/uIy5yuO3igdwsYEeQaP3re36aVAhwa0pOobcetpqzenZhxe",  admintype: true });

  db.ipamnetwork.create({ network: 'test1', vlan: '1001', subnet: '10.0.0.1/24', netmask: '255.255.255.0', gateway: '10.0.0.1', fromip: '10.0.0.2', toip: '10.0.0.254' });
  db.ipamnetwork.create({ network: 'test2', vlan: '1002', subnet: '20.0.0.1/24', netmask: '255.255.255.0', gateway: '20.0.0.1', fromip: '20.0.0.2', toip: '20.0.0.254' });

  db.ipamip.create({ network: 'test2', ip: '20.0.0.2' });
  db.ipamip.create({ network: 'test2', ip: '20.0.0.3' });
  db.ipamip.create({ network: 'test2', ip: '20.0.0.4' });
  db.ipamip.create({ network: 'test2', ip: '20.0.0.5', exclude: true });
  db.ipamip.create({ network: 'test2', ip: '20.0.0.6', hostname: 'SIX' });
}  

db.seed = seed;
module.exports = db;

