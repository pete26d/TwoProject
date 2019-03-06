module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    recipeName: DataTypes.STRING,
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
    description: DataTypes.TEXT,
    needToBuy: DataTypes.BOOLEAN
  });
  return Recipe;
};
