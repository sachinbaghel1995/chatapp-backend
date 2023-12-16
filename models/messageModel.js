module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("message", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      text: { type: DataTypes.STRING, allowNull: false },
    });
    return Message;
  };