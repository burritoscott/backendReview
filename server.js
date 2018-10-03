// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");

// Initialize Express
var app = express();

// Initialize body-parser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "animals";
var collections = ["pets"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Routes
// 1. At the root path, send a simple hello world message to the browser
//this block of code isn't necessary if app.use(express.static("public")); is used

// 1. At the "/all" path, display every entry in the animals collection
app.get("/all", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything
  db.pets.find({}, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// 2. At the "/pets:id" path, display every entry in the animals collection, sorted by pet
app.get("/pets/:id", function(req, res) {
  // Find just one result in the notes collection
  db.pets.findOne(
    {
      // Using the id in the url
      _id: mongojs.ObjectId(req.params.id)
    },
    function(error, found) {
      // log any errors
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        // Otherwise, send the note to the browser
        // This will fire off the success function of the ajax request
        console.log(found);
        res.send(found);
      }
    }
  );
});

// 3. At the "/weight" path, display every entry in the animals collection, sorted by weight
app.get("/insert", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything,
  // but this time, sort it by weight (-1 means descending order)
  db.pets.insert(req.body),
    function(error, found) {
      // Log any errors if the server encounters one
      if (error) {
        console.log(error);
      }
      // Otherwise, send the result of this query to the browser
      else {
        res.send(found);
      }
    };
});

// 4. Delete a pet
app.get("/insert", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything,
  // but this time, sort it by weight (-1 means descending order)
  db.pets.deleteOne(
    {
      _id: ObjectId(req.params.id)
    },
    function(error, found) {
      // Log any errors if the server encounters one
      if (error) {
        console.log(error);
      }
      // Otherwise, send the result of this query to the browser
      else {
        res.send(found);
      }
    }
  );
});

// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
