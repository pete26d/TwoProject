$("#submitBtn").on("click", function(event) {
  event.preventDefault();

  // Here we grab the form elements
  var newRecipe = {
    // customerName: $("#email").val().trim(),//NEED TO ADD EMAIL TO RECIPE.js
    recipeName: $("#recipe_name").val().trim(),
    ingredient_one: $("#ingredient_one").val().trim(),
    ingredient_two: $("#ingredient_two").val().trim(),  /// If this works add rest ingredients -ten
    ingredient_three: $("#ingredient_three").val().trim(),
    ingredient_four: $("#ingredient_four").val().trim(),
    ingredient_five: $("#ingredient_five").val().trim(),
    ingredient_six: $("#ingredient_six").val().trim(),
    ingredient_seven: $("#ingredient_seven").val().trim(),
    ingredient_eight: $("#ingredient_eight").val().trim(),
    ingredient_nine: $("#ingredient_nine").val().trim(),
    ingredient_ten: $("#ingredient_ten").val().trim(),
    description: $("#textarea").val().trim()
  };

  console.log(newRecipe);

  // This line is the magic. It"s very similar to the standard ajax function we used.
  // Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
  // The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
  // depending on if a tables is available or not.

  $.ajax({
    url: "/api/recipeform",
    data: newRecipe,
    method: "POST"
  }).done(function(){
    // If a table is available... tell user they are booked.
    if (data) {
        alert("Yay! You are officially booked!");
      }

      // If a table is available... tell user they on the waiting list.
      else {
        alert("Sorry you are on the wait list");
      }

      // Clear the form when submitting
      $("#recipe_name").val("");
      $("#ingredient_one").val("");
      $("#ingredient_two").val("");
      $("#ingredient_three").val("");
      $("#ingredient_four").val("");
      $("#ingredient_five").val("");
      $("#ingredient_six").val("");
      $("#ingredient_seven").val("");
      $("#ingredient_eight").val("");
      $("#ingredient_nine").val("");
      $("#ingredient_ten").val("");
      $("#textarea").val("");
  })
   
});
