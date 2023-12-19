module.exports = (sequelize, DataTypes) => {
    const MessageGroup = sequelize.define("messagegroup", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    
    });
    return MessageGroup;
  };