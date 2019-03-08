module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {

    userID: DataTypes.INTEGER,
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },

    ingredient_one: DataTypes.STRING,
    ingredient_two: DataTypes.STRING,
    ingredient_three: DataTypes.STRING,
    ingredient_four: DataTypes.STRING,
    ingredient_five: DataTypes.STRING,
    ingredient_six: DataTypes.STRING,
    ingredient_seven: DataTypes.STRING,
    ingredient_eight: DataTypes.STRING,
    ingredient_nine: DataTypes.STRING,
    ingredient_ten: DataTypes.STRING,

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 2000]
      }
    },

    needToBuy: DataTypes.BOOLEAN
  });
  return Recipe;
};
