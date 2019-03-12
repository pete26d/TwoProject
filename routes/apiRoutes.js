var db = require("../models");
var passport = require("../config/passport");
module.exports = function(app) {
  
  // Create a new Recipe
  app.post("/api/recipeform", function(req, res) {
    console.log(req.body)
    db.Recipe.create(req.body).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });
  
  
  // Get all Recipes
  // app.get("/api/recipes", function(req, res) {
  //   db.Recipe.findAll({}).then(function(dbRecipes) {
  //     res.json(dbRecipes);
  //   });
  // });

//NEW ROUTING AFTER MERGE

app.get("/api/recipes", function(req, res) {
  var query = {};
  if (req.query.User_id) {
    query.UserId = req.query.user_id;
  }
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Author
  db.Recipe.findAll({
    where: query,
    include: [db.User]
  }).then(function(dbRecipe) {
    res.json(dbRecipe);
  });
});

// Get route for retrieving a single recipe
app.get("/api/recipes/:id", function(req, res) {
  // Here we add an "include" property to our options in our findOne query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Author
  db.Recipe.findOne({
    where: {
      id: req.params.id
    },
    include: [db.User]
  }).then(function(dbRecipe) {
    console.log("this route works");
    console.log(dbRecipe);
    res.json(dbRecipe);
  });
});


  
  // Delete an Recipe by id
  app.delete("/api/recipes/:id", function(req, res) {
    db.Recipe.destroy({ where: { id: req.params.id } }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });
  
  
  
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/members");
  });
  
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
