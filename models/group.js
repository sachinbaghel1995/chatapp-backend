
module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define("group", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId:{
        type: DataTypes.INTEGER

      }
    });
    
    return Group;
  };
