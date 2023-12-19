
module.exports = (sequelize, DataTypes) => {
    const UserGroup = sequelize.define("usergroup", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    
    });
    return UserGroup;
  };