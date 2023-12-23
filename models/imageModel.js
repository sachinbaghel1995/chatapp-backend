module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      image: {
        type: DataTypes.STRING,
        
      }
      
    
    });
  
    return Image;
  };