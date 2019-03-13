//import { createCipher } from "crypto";

$(document).ready(function() {

  var $RecipeContainer = $(".recipe-container");
  // Adding event listeners for displaying recipes
  //$(document).on("click", "button.display", displayRecipe);

  // Our initial recipes array
  var recipes = [];

  // Getting recipes from database when page loads
  getRecipes();

  // This function resets the recipes displayed with new recipes from the database
  function initializeRows() {
    $RecipeContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < recipes.length; i++) {
      rowsToAdd.push(createNewRow(recipes[i]));
    }
    $RecipeContainer.prepend(rowsToAdd);

  }

  // This function grabs todos from the database and updates the view
  function getRecipes() {
    $.get("/api/recipes", function(data) {
      recipes = data;
      initializeRows();
    });
  }

  // This function deletes a todo when the user clicks the delete button
  // function displayRecipe(event) {
  //   console.log("button works")
  //   // event.stopPropagation();
  //   // var id = $(this).data("id");
  //   // $.ajax({
  //   //   method: "DELETE",
  //   //   url: "/api/todos/" + id
  //   // }).then(getTodos);
  // }


  // This function constructs a todo-item row
  function createNewRow(recipe) {
    var $newInputRow = $(
      [
        "<li class='list-group-item recipe-item'>",
        "<span class='font-weight-bold'>",
        recipe.recipeName,
        "</span>",
        "<button class='float-right display btn btn-dark'>Display Recipe</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.display").data("id", recipe.id);
    $newInputRow.find("button.display").data("target", "#modal-" + recipe.id);
    $newInputRow.find("button.display").data("toggle", "modal");
    $newInputRow.data("recipe", recipe);

    return $newInputRow;
  }
});
  
$(document).on("click", "button.display", function() {
    var mRecipeId = $(this).data("id");
    console.log(mRecipeId);
    event.preventDefault();
    $.get("/api/recipes/" + mRecipeId, function(data) {
        $("#mRecipeName").text(data.recipeName);
        $("#mRecipeAuthor").text(data.User.email);
        $("#mRecipeIngredients").text(
          data.ingredient_one + ", " +
          data.ingredient_two + ", " +
          data.ingredient_three + ", " +
          data.ingredient_four + ", " +
          data.ingredient_five + ", " +
          data.ingredient_six + ", " +
          data.ingredient_seven + ", " +
          data.ingredient_eight + ", " +
          data.ingredient_nine + ", " +
          data.ingredient_ten);
        $("#mRecipeDirections").text(data.description);
        $("#recipeModal").modal("toggle"); 
      });

});
