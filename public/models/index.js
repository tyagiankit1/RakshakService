
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

 
db.mechanicDetails = require("./mechanicDetails.model.js")(sequelize, Sequelize);
db.userDetails = require("./userDetails.model.js")(sequelize, Sequelize);
db.empDetails = require("./empDetails.model.js")(sequelize, Sequelize);
db.qrCodeLotDetails = require("./qrCodeLotDetails.model.js")(sequelize, Sequelize);
db.qrCodeDetails = require("./qrCodeDetails.model.js")(sequelize, Sequelize);
db.vehicleDetails = require("./vehicleDetails.model.js")(sequelize, Sequelize);
db.userOrderDetails = require("./userOrderDetails.model.js")(sequelize, Sequelize);

module.exports = db;
