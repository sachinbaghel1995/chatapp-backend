const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel.js")(sequelize, DataTypes);
db.messages = require("./messageModel.js")(sequelize, DataTypes);
db.groups = require("./group.js")(sequelize, DataTypes);
db.usergroups = require("./userGroup.js");

db.sequelize.sync({ force: true }).then(() => {
  console.log("sync done");
});
db.users.hasMany(db.messages);
db.messages.belongsTo(db.users);

db.groups.hasMany(db.messages);
db.messages.belongsTo(db.groups);

db.users.belongsToMany(db.groups, {
  through: "UserGroup",
  foreignKey: "userId",
});
db.groups.belongsToMany(db.users, {
  through: "UserGroup",
  foreignKey: "groupId",
});

// db.groups.belongsToMany(db.messages, { through: "MessageGroup" });
// db.messages.belongsToMany(db.groups, { through: "MessageGroup" });

module.exports = db;
