const dbConfig = require("../config/config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.user = require("./user.js")(sequelize, Sequelize);
db.tutorProfile = require("./tutorProfile.js")(sequelize, Sequelize);
db.chat = require("./chatSession.js")(sequelize, Sequelize);
db.conversation = require("./chatMessage")(sequelize, Sequelize);
// Object.values(db).forEach((model) => {
//   if (model.associate) {
//     // model.associate(db);
//     console.log("imported models is", db)
//   }
// });
// Define associations here if needed
// For example:
// db.user.hasOne(db.profile);
// db.profile.belongsTo(db.user);

module.exports = db;