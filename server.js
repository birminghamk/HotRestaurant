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
  {
    routeName: "jones",
    name: "Mr. Jones",
    phoneNumber: 3035898163,
    email: "mrjones@gmail.com",
    uniqueID: "TheJoneses"
  }
];

var waitlist = [
  {
    routeName: "delcore",
    name: "Delcore",
    phoneNumber: 3038574635,
    email: "delcore@gmail.com",
    uniqueID: "Delcore"
  },
    {
    routeName: "katie",
    name: "Katie",
    phoneNumber: 3038574635,
    email: "katie@gmail.com",
    uniqueID: "Katie"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});





// Create New Characters - takes in JSON input
app.get("/api/tables", function(req, res) {
  return res.json(reservations)
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist)
});

app.post("/api/clear", function() {
    //empty out the arrays of data
    reservations = [];
    waitlist = [];

    console.log(reservations);


})

// Search for Specific Character (or all characters) - provides JSON
app.post("/api/:newReservation?", function(req, res) {

      if (reservations.length < 5) {
          reservations.push(req.body);
          return res.json(reservations);
      } else {
          waitlist.push(req.body);
          return res.json(waitlist);
      } 

});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

