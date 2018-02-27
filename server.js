// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var reservations = [
  {
    routeName: "smith",
    name: "Smith",
    phoneNumber: 3038867436,
    email: "smith@gmail.com",
    uniqueID: "TheSmiths"
  },
];

var waitlist = [
  {
    routeName: "delcore",
    name: "Delcore",
    phoneNumber: 3038574635,
    email: "delcore@gmail.com",
    uniqueID: "Delcore"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/waitlist", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});


// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:newReservation?", function(req, res) {

      if (reservations.length < 5) {
          reservations.push(req.body);
          res.json(true);
      } else {
          waitlist.push(req.body);
          res.json(false);
      } 


});


// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newreservations = req.body;
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newreservations.routeName = newreservations.name.replace(/\s+/g, "").toLowerCase();

  console.log(newreservations);

  reservations.push(newreservations);

  res.json(newreservations);
  res.json(reservations);
});

app.post("/api/waitlist", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var waitingParties = req.body;
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  waitingParties.routeName = waitingParties.name.replace(/\s+/g, "").toLowerCase();

  console.log(waitingParties);

  waitlist.push(waitingParties);

  res.json(waitingParties);
  res.json(waitlist);
});

app.post("/api/clear", function() {
    //empty out the arrays of data
    reservations = [];
    waitlist = [];

    console.log(reservations);


})
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
