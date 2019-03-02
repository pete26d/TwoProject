//FROM OLD SITE
//EDAMAM STUFF
$(document).ready(function () {
  $('#search-term').submit(function (event) {
      event.preventDefault();
      var searchTerm = $('#query').val();
      getRequest(searchTerm);


      // search term. Check Edamam page if we look to filter even further
      var queryURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=8c4edf85&app_key=658de4f65177123c991d45cf851c94cd";

      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function (response) {


          // clear recipe card box
          $("#recipeCards").empty();

          // here we're console logging the full response from the user input search term. Then we're testing paths down to just ingredients, etc.

          console.log(response.hits);
          console.log(response.hits[0].recipe.ingredients);


          let recipeCount = response.hits;


          // we start a for loop to create 10 cards worth of recipes


          for (var i = 0; i < recipeCount.length; i++) {
              console.log("For loop ran");

              let image = response.hits[i].recipe.image;

              let recipeName = response.hits[i].recipe.label;
              console.log(recipeName);



              // Build individual cards for each recipe displaying recipe photo, title, and "more info" button for  viewing..
              // ..full ingredient list and link to recipe


              let showDiv = $("<div>");
              let showImage = $("<img>");
              let showTitle = $("<p>").text(recipeName);
              let showFooter = $("<div>").text(" View Ingredients...");

              showDiv.attr("class", "card col-md-3 d-inline-flex animated fadeInUp");
              showDiv.attr("style", "max-width: 11rem;");
              showImage.attr("class", "card-img-top");
              showImage.attr("src", image);
              showTitle.attr("class", "cardTitle");
              showFooter.attr("class", "card-footer text-muted");

              showFooter.attr("data-count", i);
              showFooter.attr("data-target", "#modal-" + i);
              showFooter.attr("data-toggle", "modal");

              showTitle.attr("class", "card-title");
              showDiv.prepend(showFooter);
              showDiv.prepend(showTitle);
              showDiv.prepend(showImage);

              $("#recipeCards").append(showDiv);

              let modalRecipe = response.hits[i].recipe.ingredients;

              console.log(modalRecipe);

              let modalLink = response.hits[i].recipe.url;


              // Building the Modal. Using this ugly mess so I don't have to build a modal piece by piece

              $("#recipeCards").append('<div class="modal fade" id="modal-' + i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="modalTitle">' + recipeName + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" id="modalBody"><ul class="modalList-' + [i] + '"></ul></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button><a class="btn btn-outline-success" href="' + modalLink + '" role="button" target="_blank">View Recipe</a></div></div></div></div>');


              $(".modalList").empty();

              // Trying to create a loop to show all ingredients. THIS IS WHERE I'm having trouble
              // Have it so it's spitting out ingredients... but it may be listing every single recipe's ingredients on each card
              for (let j = 0; j < modalRecipe.length; j++) {


                  console.log("for loop ran");
                  let modalIngredients = modalRecipe[j].text;
                  console.log(modalIngredients);
                  let modalList = $("<li>").text(modalIngredients);


                  $(".modalList-" + [i]).append(modalList)


              }


              $("#recipeCards").append(showDiv);

              //commented out 97- djj
              //let modalRecipe = response.hits[i].recipe.ingredients;                

              console.log(modalRecipe);



          }


      });


  });




});

//YOUTUBE STUFF
$(document).ready(function () {

  $("#videos").hide();

  $('#search-term').submit(function (event) {
      event.preventDefault();
      var searchTerm = $('#query').val();
      getRequest(searchTerm);
      console.log(searchTerm);

      $("#videos").show();
      $("#videos").addClass("animated fadeInUp");
  });
});

function getRequest(searchTerm) {
  var url = 'https://www.googleapis.com/youtube/v3/search';
  var params = {
      part: 'snippet',
      key: 'AIzaSyBoeAORrZ6eh2-ayyufG7OVOu24CKb_Ww8',
      type: 'video',
      videoEmbeddable: 'true',
      order: "viewCount",
      q: searchTerm + "recipe"

  };

  $.getJSON(url, params, showResults);
}

function showResults(results) {
  var html = "";
  var entries = results.items;

  $.each(entries, function (index, value) {
      var video = results.items[index].id.videoId;
      var title = value.snippet.title;
      var thumbnail = value.snippet.thumbnails.default.url;

      html += '<a target="_blank" href="https://www.youtube.com/embed/' + video + '"><img src="' + thumbnail + '"></a>';
      html += '<a target="_blank" href="https://www.youtube.com/embed/' + video + '"><p class="youtubelink" id=link-' + index + '>' + title + '</p></a>'
      console.log(video)


  });
  
$('#video-info').html(html);









 








// Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
