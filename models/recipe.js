module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {


    user: DataTypes.INTEGER,
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

  Recipe.associate = function(models) {
    // We're saying that a Recipe should belong to a User
    // A Recipe can't be created without a User due to the foreign key constraint
    Recipe.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Recipe;
};
